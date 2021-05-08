import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import { debounce } from 'min-dash';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
import color from 'bpmn-js-in-color';

import diagramXML from '../resources/newDiagram.bpmn';


var container = $('#js-drop-zone');

var canvas = $('#js-canvas');

var bpmnModeler = new BpmnModeler({
  container: canvas,
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    color,
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});
container.removeClass('with-diagram');

function createNewDiagram() {
  openDiagram(diagramXML);
}

async function openDiagram(xml) {

  try {
    debugger
    await bpmnModeler.importXML(xml);

    container
      .removeClass('with-error')
      .addClass('with-diagram');
  } catch (err) {

    container
      .removeClass('with-diagram')
      .addClass('with-error');

    container.find('.error pre').text(err.message);

    console.error(err);
  }
}

async function importDiagram(xml) {
  try {
    xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" id=\"sample-diagram\" targetNamespace=\"http://bpmn.io/schema/bpmn\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\">\n  <bpmn2:collaboration id=\"Collaboration_17m6qsq\">\n    <bpmn2:participant id=\"Participant_0dhmus5\" processRef=\"Process_1\" />\n  </bpmn2:collaboration>\n  <bpmn2:process id=\"Process_1\" isExecutable=\"false\">\n    <bpmn2:startEvent id=\"StartEvent_1\">\n      <bpmn2:outgoing>Flow_11v8vqr</bpmn2:outgoing>\n    </bpmn2:startEvent>\n    <bpmn2:exclusiveGateway id=\"Gateway_0fa13y8\">\n      <bpmn2:incoming>Flow_11v8vqr</bpmn2:incoming>\n      <bpmn2:outgoing>Flow_14958tu</bpmn2:outgoing>\n    </bpmn2:exclusiveGateway>\n    <bpmn2:sequenceFlow id=\"Flow_11v8vqr\" sourceRef=\"StartEvent_1\" targetRef=\"Gateway_0fa13y8\" />\n    <bpmn2:task id=\"Activity_1td11ff\">\n      <bpmn2:incoming>Flow_14958tu</bpmn2:incoming>\n    </bpmn2:task>\n    <bpmn2:sequenceFlow id=\"Flow_14958tu\" sourceRef=\"Gateway_0fa13y8\" targetRef=\"Activity_1td11ff\" />\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Collaboration_17m6qsq\">\n      <bpmndi:BPMNShape id=\"Participant_0dhmus5_di\" bpmnElement=\"Participant_0dhmus5\" isHorizontal=\"true\">\n        <dc:Bounds x=\"280\" y=\"160\" width=\"600\" height=\"250\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNEdge id=\"Flow_11v8vqr_di\" bpmnElement=\"Flow_11v8vqr\">\n        <di:waypoint x=\"448\" y=\"258\" />\n        <di:waypoint x=\"505\" y=\"258\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNEdge id=\"Flow_14958tu_di\" bpmnElement=\"Flow_14958tu\">\n        <di:waypoint x=\"555\" y=\"258\" />\n        <di:waypoint x=\"620\" y=\"258\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape xmlns:color=\"http://www.omg.org/spec/BPMN/non-normative/color/1.0\" id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\" color:background-color=\"#4b0082\">\n        <dc:Bounds x=\"412\" y=\"240\" width=\"36\" height=\"36\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape xmlns:color=\"http://www.omg.org/spec/BPMN/non-normative/color/1.0\" id=\"Gateway_0fa13y8_di\" bpmnElement=\"Gateway_0fa13y8\" isMarkerVisible=\"true\" color:background-color=\"#ffff00\">\n        <dc:Bounds x=\"505\" y=\"233\" width=\"50\" height=\"50\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape xmlns:color=\"http://www.omg.org/spec/BPMN/non-normative/color/1.0\" id=\"Activity_1td11ff_di\" bpmnElement=\"Activity_1td11ff\" color:background-color=\"#ff0000\">\n        <dc:Bounds x=\"620\" y=\"218\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>\n";
    await bpmnModeler.importXML(xml);
    try {
      const result = await bpmnModeler.open(bpmnDiagram);
      const { warnings } = result;
      console.log(warnings);
    } catch (err) {
      console.log(err.message, err.warnings);
    }
    container
      .removeClass('with-error')
      .addClass('with-diagram');
  } catch (err) {

    container
      .removeClass('with-diagram')
      .addClass('with-error');

    container.find('.error pre').text(err.message);

    console.error(err);
  }
}

function registerFileDrop(container, callback) {

  function handleFileSelect(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;

    var file = files[0];

    var reader = new FileReader();

    reader.onload = function (e) {

      var xml = e.target.result;

      callback(xml);
    };

    reader.readAsText(file);
  }

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  container.get(0).addEventListener('dragover', handleDragOver, false);
  container.get(0).addEventListener('drop', handleFileSelect, false);
}


////// file drag / drop ///////////////////////

// check file api availability
if (!window.FileList || !window.FileReader) {
  window.alert(
    'Looks like you use an older browser that does not support drag and drop. ' +
    'Try using Chrome, Firefox or the Internet Explorer > 10.');
} else {
  registerFileDrop(container, openDiagram);
}

// bootstrap diagram functions

$(function () {

  $('#js-create-diagram').click(function (e) {
    e.stopPropagation();
    e.preventDefault();

    createNewDiagram();
  });

  $('#bpmnFileName').click(function(e){
    debugger
    e.stopPropagation();
    e.preventDefault();

    importDiagram();
  });

  $('input[type="file"][id="txt_localFile"]').click();


  var downloadLink = $('#js-download-diagram');
  var downloadSvgLink = $('#js-download-svg');

  $('.buttons a').click(function (e) {
    if (!$(this).is('.active')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function setEncoded(link, name, data) {
    console.log(data);
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  var exportArtifacts = debounce(async function () {

    try {

      const { svg } = await bpmnModeler.saveSVG();

      setEncoded(downloadSvgLink, 'diagram.svg', svg);
    } catch (err) {

      console.error('Error happened saving SVG: ', err);

      setEncoded(downloadSvgLink, 'diagram.svg', null);
    }

    try {

      const { xml } = await bpmnModeler.saveXML({ format: true });

      setEncoded(downloadLink, 'diagram.bpmn', xml);
    } catch (err) {

      console.log('Error happened saving XML: ', err);

      setEncoded(downloadLink, 'diagram.bpmn', null);
    }
  }, 500);

  bpmnModeler.on('commandStack.changed', exportArtifacts);
});
