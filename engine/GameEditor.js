ENGINE.GameEditor = function ()
{
    this.game = null;


    this.editorHTML =document.getElementsByClassName("editor")[0];

    this.editorTop =document.createElement("div");
    this.editorTop.className = "editorTop"
    this.editorHTML.appendChild( this.editorTop );


    this.editorLeft =document.createElement("div");
    this.editorLeft.className = "editorLeft"
    this.editorTop.appendChild( this.editorLeft );


    this.editorCodeTabs = document.createElement("div");
    this.editorCodeTabs.className = "editorCodeTabs";
    this.editorLeft.appendChild( this.editorCodeTabs );

    this.editorCode = document.createElement("div");
    this.editorCode.className = "editorCode";
    this.editorLeft.appendChild( this.editorCode );


    this.tabs = {};
    this.currentTab = null;

    /*
    this.code1 = CodeMirror( this.editorCode, {
        lineNumbers: true, matchBrackets: true, indentWithTabs: false, styleActiveLine: true,
        theme:'monokai', mode:'text/javascript',
        tabSize: 4, indentUnit: 4, highlightSelectionMatches: {showToken: /\w/}
    });

    this.code1.getWrapperElement().style.display = "none";*/


    this.separator =document.createElement("div");
    this.separator.className = "separator"
    this.editorTop.appendChild( this.separator );

    this.gameHTML =document.createElement("div");
    this.gameHTML.className = "game"
    this.editorTop.appendChild( this.gameHTML );

    this.editorBottom =document.createElement("div");
    this.editorBottom.className = "editorBottom"
    this.editorHTML.appendChild( this.editorBottom );



    let nd = document.createElement("div");
    nd.className = "editorButtonGroup";
    nd.style.width = "80px";
    this.editorBottom.appendChild( nd );

    this.lastClientX = 500;

    this.buttonNew =document.createElement("div");
    this.buttonNew.className = "editorButton"
    this.buttonNew.textContent = "New"
    this.buttonNew.addEventListener('click', function () {
        this.overlayNameWindow.style.display = "block";
    }.bind(this));
    nd.appendChild( this.buttonNew );

    this.buttonClose =document.createElement("div");
    this.buttonClose.className = "editorButton"
    this.buttonClose.textContent = "Close"
    this.buttonClose.addEventListener('click', function () {
        if (this.currentTab!=null)
            this.closeTab(this.currentTab);
    }.bind(this));
    nd.appendChild( this.buttonClose );


    nd = document.createElement("div");
    nd.className = "editorButtonGroup";
    nd.style.width = "80px";
    this.editorBottom.appendChild( nd );



    this.inputFile = document.createElement("input");
    this.inputFile.type = "file";
    this.inputFile.style.display = "none";
    this.inputFile.onchange = function (e) {



        console.log("CHANGED");
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = function (e) {
            this.addTab(file.name,e.target.result);
        }.bind(this)



    }.bind(this);


    this.buttonOpen =document.createElement("div");
    this.buttonOpen.className = "editorButton";
    this.buttonOpen.textContent = "Open";
    this.buttonOpen.addEventListener('click', function () {
        this.inputFile.click();
    }.bind(this));
    nd.appendChild( this.buttonOpen );


    this.outputFile =document.createElement("a");
    this.outputFile.type = "file";
    this.outputFile.style.display = "none";


    this.buttonSave =document.createElement("div");
    this.buttonSave.className = "editorButton"
    this.buttonSave.textContent = "Save"
    this.buttonSave.addEventListener('click', function () {

        if (this.currentTab!==null)
        {
            let textToSave = this.tabs[this.currentTab].code.getValue()
            let textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
            let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

            this.outputFile.download = this.tabs[this.currentTab].fileName;
            this.outputFile.innerHTML = "Download File";
            this.outputFile.href = textToSaveAsURL;
            this.outputFile.click();
        }

    }.bind(this))
    nd.appendChild( this.buttonSave );


    nd = document.createElement("div");
    nd.className = "editorButtonGroup";
    nd.style.width = "190px";
    this.editorBottom.appendChild( nd );


    this.labelResorces =document.createElement("label");
    this.labelResorces.className = "editorLabel"
    this.labelResorces.htmlFor = "inputResources"
    this.labelResorces.textContent = "Resources URL"
    nd.appendChild( this.labelResorces );

    this.inputResources =document.createElement("input");
    this.inputResources.className = "editorInput"
    this.inputResources.name = "inputResources"
    this.inputResources.type = "text"
    nd.appendChild( this.inputResources );


    this.labelScene =document.createElement("label");
    this.labelScene.className = "editorLabel"
    this.labelScene.htmlFor = "inputScene"
    this.labelScene.textContent = "Scene ID"
    nd.appendChild( this.labelScene );

    this.inputScene =document.createElement("input");
    this.inputScene.className = "editorInput"
    this.inputScene.name = "inputScene"
    this.inputScene.type = "text"
    this.inputScene.addEventListener('input', function (e) {
        this.sceneId = this.inputScene.value
    }.bind(this));
    nd.appendChild( this.inputScene );



    nd = document.createElement("div");
    nd.className = "editorButtonGroup";
    nd.style.width = "120px";
    this.editorBottom.appendChild( nd );


    this.buttonReloadAll =document.createElement("div");
    this.buttonReloadAll.className = "editorButton"
    this.buttonReloadAll.textContent = "Reload All"
    this.buttonReloadAll.addEventListener('click', function () {
        this.reloadAll();
    }.bind(this));
    nd.appendChild( this.buttonReloadAll );

    this.buttonHotReload =document.createElement("div");
    this.buttonHotReload.className = "editorButton"
    this.buttonHotReload.textContent = "Hot Reload";
    this.buttonHotReload.addEventListener('click', function () {
        this.hotReload();
    }.bind(this));
    nd.appendChild( this.buttonHotReload );

    nd = document.createElement("div");
    nd.className = "editorButtonGroup";
    nd.style.width = "130px";
    this.editorBottom.appendChild( nd );


    this.buttonPause =document.createElement("div");
    this.buttonPause.className = "editorButton"
    this.buttonPause.textContent = "Start";
    this.buttonPause.addEventListener('click', function () {
        this.pause();
    }.bind(this));
    nd.appendChild( this.buttonPause );

    this.buttonReset =document.createElement("div");
    this.buttonReset.className = "editorButton"
    this.buttonReset.textContent = "Reset Scene"
    this.buttonReset.addEventListener('click', function () {

        this.init();

    }.bind(this));
    nd.appendChild( this.buttonReset );

    nd = document.createElement("div");
    nd.className = "editorButtonGroup";
    nd.style.width = "150px";
    this.editorBottom.appendChild( nd );


    this.labelCamera =document.createElement("label");
    this.labelCamera.className = "editorLabel"
    this.labelCamera.htmlFor = "checkboxCamera"
    this.labelCamera.textContent = "Debug Camera"
    nd.appendChild( this.labelCamera );

    this.checkboxCamera =document.createElement("input");
    this.checkboxCamera.className = "editorCheckbox"
    this.checkboxCamera.name = "checkboxCamera"
    this.checkboxCamera.type = "checkbox"
    this.checkboxCamera.addEventListener('click', function () {
        this.game.setDebugCameraActive(this.checkboxCamera.checked)
    }.bind(this));
    nd.appendChild( this.checkboxCamera );


    this.buttonCameraReset =document.createElement("div");
    this.buttonCameraReset.className = "editorButton"
    this.buttonCameraReset.textContent = "Reset Camera"
    this.buttonCameraReset.addEventListener('click', function () {
        this.game.resetDebugCamera()

    }.bind(this));
    nd.appendChild( this.buttonCameraReset );


    this.overlayNameWindow = document.createElement("div");
    this.overlayNameWindow.className = "overlayNameWindow"
    this.editorHTML.appendChild( this.overlayNameWindow );


    this.labelName =document.createElement("label");
    this.labelName.className = "editorLabel"
    this.labelName.htmlFor = "inputName"
    this.labelName.textContent = "New File Name"
    this.overlayNameWindow.appendChild( this.labelName );

    this.inputName =document.createElement("input");
    this.inputName.className = "editorInput"
    this.inputName.name = "inputName"
    this.inputName.type = "text"
    this.overlayNameWindow.appendChild( this.inputName );


    this.buttonNameOk =document.createElement("div");
    this.buttonNameOk.className = "editorButton"
    this.buttonNameOk.textContent = "OK"
    this.buttonNameOk.addEventListener('click', function () {

        let txt = this.inputName.value;
        if (txt!=="")
        {
            this.addTab(txt,"");
            this.overlayNameWindow.style.display = "none";
        }
    }.bind(this));
    this.overlayNameWindow.appendChild( this.buttonNameOk );

    this.buttonNameCancel =document.createElement("div");
    this.buttonNameCancel.className = "editorButton"
    this.buttonNameCancel.textContent = "Cancel"
    this.buttonNameCancel.addEventListener('click', function () {
        this.overlayNameWindow.style.display = "none";
    }.bind(this));
    this.overlayNameWindow.appendChild( this.buttonNameCancel );

    this.overlayNameWindow.style.display = "none";


    this.isMidDown = false;
    this.midDown = function () {
        this.isMidDown = true;
        console.log("YEEE")
        document.addEventListener('mouseup', this.midUp, false ,);
        document.addEventListener('mousemove', this.resize, false );
    }.bind(this)
    this.midUp = function () {
        this.isMidDown = false;

        console.log("UPP");
        document.removeEventListener('mouseup', this.midUp);
        document.removeEventListener('mousemove', this.resize );
    }.bind(this)
    this.resize = function (e) {

        this.lastClientX = e.clientX;
        let left = e.clientX + 10;

        this.gameHTML.style.left = left +'px';
        this.separator.style.left = (left-10) + 'px';

        this.editorLeft.style.width = (left-10) + 'px';

        if (this.game)
            this.game.onWindowResize();

    }.bind(this);


    this.openCodeFromURL = function (url) {



        let fileName = url.substring(url.lastIndexOf("/")+1, url.length);


        $.get( url, function( data ) {

            this.addTab(fileName,data);

        }.bind(this), 'text');

    }

    this.addTab = function (fileName,fileText) {


        if (fileName in this.tabs)
            this.closeTab(fileName);

        let fileFormat = fileName.substring(fileName.lastIndexOf(".")+1, fileName.length);

        console.log(fileFormat);

        let mode = "application/javascript";


        if (fileFormat==="json")
            mode = "application/ld+json";
        else if (fileFormat==="js")
            mode = "application/javascript";


        let code = CodeMirror( this.editorCode, {
            lineNumbers: true, matchBrackets: true, indentWithTabs: false, styleActiveLine: true,
            theme:'monokai', mode:mode,
            tabSize: 4, indentUnit: 4, highlightSelectionMatches: {showToken: /\w/}
        });
        code.setValue( fileText );

        code.getWrapperElement().style.display = "none";


        let button = document.createElement("button");
        button.textContent = fileName;
        button.className = "tabButton";
        button.onclick = function() {

            this.openTab(fileName);

        }.bind(this);
        this.editorCodeTabs.appendChild(button);



        this.tabs[fileName] = {
            fileName:fileName,
            button:button,
            code:code,
            codeHTML:code.getWrapperElement()
        }


        this.openTab(fileName);
        this.updateTabs();
    }

    this.openTab = function (tabId) {

        if (this.currentTab)
        {
            this.tabs[this.currentTab].button.className = this.tabs[this.currentTab].button.className.replace(" active","");
            this.tabs[this.currentTab].codeHTML.style.display = "none";
        }

        this.tabs[tabId].codeHTML.style.display = "block";
        this.tabs[tabId].button.className += " active";
        this.currentTab = tabId;
        this.updateTabs();

    }
    this.closeTab = function (tabId) {
        this.tabs[tabId].codeHTML.remove();
        this.tabs[tabId].button.remove();


        delete this.tabs[tabId];

        if (this.currentTab===tabId)
        {
            this.currentTab = null;
            if (Object.keys(this.tabs).length>0)
                this.openTab(Object.keys(this.tabs)[0])
        }
        this.updateTabs();
    }

    this.updateTabs = function () {

        let tabs = Object.entries(this.tabs);

        for (const [key, value] of tabs) {

            if (key === this.currentTab)
                value.button.style.width = "30%"
            else
                value.button.style.width = (70/(tabs.length+0.5))+"%"
        }
    }

    this.updateEditorFiles = function () {

        let e = {};

        for (const [key, value] of Object.entries(this.tabs)) {
            e[value.fileName] = value.code.getValue();
        }


        this.game.resources.setEditorFiles(e);
    }

    this.hotReload = function () {
        this.updateEditorFiles();
        this.game.hotReload();
    }
    this.openCodeFromURLs = function (urls) {

        for (let i=0;i<urls.length;i++)
            this.openCodeFromURL(urls[i]);



    }

    this.openCodeFromSystem = function () {


    }


    this.separator.addEventListener('mousedown',this.midDown, false );

}


ENGINE.GameEditor.prototype = {

    boot : function(resourcesDataURL,sceneId,loopType) {
        this.game = new ENGINE.Game(loopType);

        this.game.setDebugActive(true);


        this.resourcesDataURL = resourcesDataURL;
        this.sceneId = sceneId;
        this.inputResources.value = this.resourcesDataURL;
        this.inputScene.value = this.sceneId;


        this.reloadAll();



    },


    reloadAll : function() {


        if (this.game.resources)
            this.updateEditorFiles();

        this.game.boot(function () {

            this.game.resources.loadPackage(this.resourcesDataURL,function () {


                this.init();




            }.bind(this));


        }.bind(this));
    },


    init : function () {


        this.game.init(this.sceneId);

        window.setTimeout(function () {

            this.resize({clientX:this.lastClientX})

        }.bind(this),100)

        this.buttonPause.textContent = "Start";

        //this.game.start();
        //
    },


    pause : function () {
        if (this.game.updating)
        {
            this.buttonPause.textContent = "Resume";
            this.game.pause();
        }
        else
        {
            this.buttonPause.textContent = "Pause";
            this.game.start();
        }
    }
}



ENGINE.GameEditor.prototype.constructor = ENGINE.GameEditor;

