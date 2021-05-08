import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {
  debugger

  // Only return an entry, if the currently selected
  // element is a start event.
  group.entries.push(entryFactory.selectBox(translate, {
    id : 'spell',
    description : 'Hiển thị danh sách phòng ban',
    label : 'Danh sách phòng ban',
    modelProperty : 'spell',
    selectOptions: [ { name: '', value: '' },{ name: 's', value: 's' }, { name: 'sss', value: 'sss' } ]
  }));
}