function getDot(n) {
  var dots = '';
  for(let i=0; i<n; i++) {
    dots+='<div class="dot"></div>';
  }
  
  return dots;
}


var treeComponent = {
  title: 'Tree Animation using pure CSS',
  description: '',
  view: `
    <div class="view tree-view">
      <div class="tree-frame">
        ${ getDot(1) }
      </div>
    </div>
  `
}

export { treeComponent };
