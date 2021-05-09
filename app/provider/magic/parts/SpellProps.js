import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {
  debugger

  // Only return an entry, if the currently selected
  // element is a start event.spell
  group.entries.push(entryFactory.checkbox(translate, {
    id : 'spell',
    description : 'Hiển thị danh sách phòng ban',
    label : 'Danh sách phòng ban',
    modelProperty : 'department',
    selectOptions: [ { name: '', value: '' },{ name: 's', value: 's' }, { name: 'sss', value: 'sss' } ]
  }));
}