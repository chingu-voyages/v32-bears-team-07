import React, { useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import { Container } from "react-bootstrap";
import "./grapesjs.css";

const GrapesJS = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: "#gjs",
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: "400px",
      width: "auto",
      // Disable the storage manager for the moment
      storageManager: {
        type: "remote",
        autosave: true,
        stepsBeforeSave: 1,
        urlStore: "https://salty-oasis-94975.herokuapp.com/api/auth",
        // urlLoad: "http://load/endpoint",
        params: {}, // Custom parameters to pass with the remote storage request, eg. CSRF token
        headers: {}, // Custom headers for the remote storage request
      },
      commands: {
        defaults: [
          {
            id: "store-data",
            run(editor) {
              editor.store();
            },
          },
        ],
      },
      // Avoid any default panel
      panels: {
        defaults: [
          {
            id: "layers",
            el: ".panel__right",
            // Make the panel resizable
            resizable: {
              maxDim: 450,
              minDim: 200,
              tc: 0, // Top handler
              cl: 1, // Left handler
              cr: 0, // Right handler
              bc: 0, // Bottom handler
              // Being a flex child we need to change `flex-basis` property
              // instead of the `width` (default)
              keyWidth: "flex-basis",
            },
          },
          {
            id: "panel-switcher",
            el: ".panel__switcher",
            buttons: [
              {
                id: "show-layers",
                active: true,
                label: "Layers",
                command: "show-layers",
                // Once activated disable the possibility to turn it off
                togglable: false,
              },
              {
                id: "show-style",
                active: true,
                label: "Styles",
                command: "show-styles",
                togglable: false,
              },
              {
                id: "show-traits",
                active: true,
                label: "Traits",
                command: "show-traits",
                togglable: false,
              },
              {
                id: "alert-button",
                className: "btn-alert-button",
                label: "Save",
                command(editor) {
                  console.log(editor.getHtml());
                  console.log(editor.getCss());
                  console.log(editor.getComponents());
                  console.log(editor.getStyle());
                },
              },
            ],
          },
          {
            id: "panel-devices",
            el: ".panel__devices",
            buttons: [
              {
                id: "device-desktop",
                label: "D",
                command: "set-device-desktop",
                active: true,
                togglable: false,
              },
              {
                id: "device-mobile",
                label: "M",
                command: "set-device-mobile",
                togglable: false,
              },
            ],
          },
        ],
      },
      blockManager: {
        appendTo: "#blocks",
        blocks: [
          {
            id: "section", // id is mandatory
            label: "<b>Section</b>", // You can use HTML/SVG inside labels
            attributes: { class: "gjs-block-section" },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
          },
          {
            id: "text",
            label: "Text",
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
          {
            id: "image",
            label: "Image",
            // Select the component once it's dropped
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: "image" },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true,
          },
        ],
      },
      layerManager: {
        appendTo: ".layers-container",
      },
      // The Selector Manager allows to assign classes and
      // different states (eg. :hover) on components.
      // Generally, it's used in conjunction with Style Manager
      // but it's not mandatory
      selectorManager: {
        appendTo: ".styles-container",
      },
      styleManager: {
        appendTo: ".styles-container",
        sectors: [
          {
            name: "Dimension",
            open: false,
            // Use built-in properties
            buildProps: ["width", "min-height", "padding"],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: "integer",
                name: "The width", // Label for the property
                property: "width", // CSS property (if buildProps contains it will be extended)
                units: ["px", "%"], // Units, available only for 'integer' types
                defaults: "auto", // Default value
                min: 0, // Min value, available only for 'integer' types
              },
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["background-color", "box-shadow", "custom-prop"],
            properties: [
              {
                id: "custom-prop",
                name: "Custom Label",
                property: "font-size",
                type: "select",
                defaults: "32px",
                // List of options, available only for 'select' and 'radio'  types
                options: [
                  { value: "12px", name: "Tiny" },
                  { value: "18px", name: "Medium" },
                  { value: "32px", name: "Big" },
                ],
              },
            ],
          },
        ],
      },
      traitManager: {
        appendTo: ".traits-container",
      },
      mediaCondition: "min-width", // default is `max-width`
      deviceManager: {
        devices: [
          {
            name: "Mobile",
            width: "320",
            widthMedia: "",
          },
          {
            name: "Desktop",
            width: "",
            widthMedia: "1024",
          },
        ],
      },
    });
    const blockManager = editor.BlockManager;
    blockManager.add("h1-block", {
      label: "Heading",
      content: "<h1>Put your title here</h1>",
      category: "Basic",
      attributes: {
        title: "Insert h1 block",
      },
    });
    blockManager.add("button", {
      label: "Button",
      content: "<button>Put your button here</button>",
      category: "Basic",
      attributes: {
        title: "Insert button block",
      },
    });

    editor.BlockManager.add("my-block-id", {
      // ...
      content: {
        tagName: "div",
        draggable: true,
        attributes: { "some-attribute": "some-value" },
        components: [
          {
            tagName: "span",
            content: "<b>Some static content</b>",
          },
          {
            tagName: "div",
            // use `content` for static strings, `components` string will be parsed
            // and transformed in Components
            components: "<span>HTML at some point</span>",
          },
        ],
      },
    });
    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
    });
    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "Exp",
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`
              )
              .open();
          },
        },
      ],
      deviceManager: {
        devices: [
          {
            name: "Desktop",
            width: "", // default size
          },
          {
            name: "Mobile",
            width: "320px", // this value will be used on canvas width
            widthMedia: "480px", // this value will be used in CSS @media
          },
        ],
      },
    });
    editor.on("run:export-template:before", (opts) => {
      console.log("Before the command run");
      if (0 /* some condition */) {
        opts.abort = 1;
      }
    });
    editor.on("run:export-template", () =>
      console.log("After the command run")
    );
    editor.on("abort:export-template", () => console.log("Command aborted"));

    // Define commands
    editor.Commands.add("show-layers", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getLayersEl(row) {
        return row.querySelector(".layers-container");
      },

      run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "";
      },
      stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "none";
      },
    });
    editor.Commands.add("show-styles", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getStyleEl(row) {
        return row.querySelector(".styles-container");
      },

      run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "";
      },
      stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "none";
      },
    });
    // Define command
    // ...
    editor.Commands.add("show-traits", {
      getTraitsEl(editor) {
        const row = editor.getContainer().closest(".editor-row");
        return row.querySelector(".traits-container");
      },
      run(editor, sender) {
        this.getTraitsEl(editor).style.display = "";
      },
      stop(editor, sender) {
        this.getTraitsEl(editor).style.display = "none";
      },
    });
    // Commands
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });
    editor.on("change:device", () =>
      console.log("Current device: ", editor.getDevice())
    );
    // Set initial device as Mobile
    // editor.setDevice("Mobile");
    console.log(editor.getHtml());
    console.log(editor.getCss());
  });

  return (
    <Container>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
        <div class="panel__devices"></div>
        <div class="panel__switcher"></div>
      </div>
      <div class="editor-row">
        <div class="editor-canvas">
          <div id="gjs">
            <h1>Hello World Component!</h1>
          </div>
        </div>
        <div class="panel__right">
          <div class="layers-container"></div>
          <div class="styles-container"></div>
          <div class="traits-container"></div>
        </div>
      </div>
      <div id="blocks"></div>
    </Container>
  );
};

export default GrapesJS;
