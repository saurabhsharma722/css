var rouletteComponent = {
  title: 'Roulette using pure CSS',
  description: '',
  view: `
    <div class="view roulette-view">
      <div class="roulette-stand"></div>
      <ul class="piechart">
        <li><b><span>win $50</span></b></li>
        <li><b><span>try again</span></b></li>
        <li><b><span>Sorry</span></b></li>
        <li><b><span>win $1000</span></b></li>
        <li><b><span>Try Again</span></b></li>
        <li><b><span>Sorry</span></b></li>
        <li><b><span>win $100</span></b></li>
        <li><b><span>Sorry</span></b></li>
        <li id="spin_buttom">Spin it</li>
      </ul>
      <div class="roulette-pointer">
        <div class="pointer"></div>
      </div>
    </div>
  `
}

export { rouletteComponent };
