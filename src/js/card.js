function card (component) {
  var selected = component.title == 'Tree Animation using pure CSS' ? ' selected' : ''
  return `
  <a class="card${selected}">
    <span class="close-btn">&#10005;</span>
    <div class="view-display">
      <div class="frame">
        ${ component.view }
      </div>
    </div>

    <div class="card-block">
      <h4 class="card-title">${ component.title }</h4>
      <p class="card-text">
        ${ component.description }
      </p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </a>
  `
}

function cards( components ) {
  var cardsView = '';

  for(let i=0; i < components.length; i++) {
    cardsView += card(components[i])
  }

  return cardsView;
}

export { cards };
