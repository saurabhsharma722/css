var hutComponent = {
  title: 'Hut using pure CSS',
  description: '',
  view: `
  <div class="view">
    <div class="hut-container">
      <div class="baseFrame">
        <ul class="mainFrame">
          <li class="frontTop"></li>
          <li class="backTop"></li>
          <li class="leftWall">
            <div class="photoFrame"><img src="https://raw.githubusercontent.com/saurabhsharma722/saurabhsharma722.github.com/master/demo/images/43D.jpg"/></div>
          </li>
          <li class="leftSideWall"></li>

          <li class="frontWall">
            <div class="doorBorder">
              <div class="leftDoor">
                <div class="glassBox"></div>
                <div class="glassBox"></div>
                <div class="glassBox" style="border-bottom:3px solid #806517;"></div>
              </div>
              <div class="rightDoor">
                <div class="glassBox"></div>
                <div class="glassBox"></div>
                <div class="glassBox" style="border-bottom:3px solid #806517;"></div>
              </div>
            </div>
          </li>
          <li class="frontWallfiller"></li>
          <li class="frontSideWallL"></li>
          <li class="frontSideWallR"></li>

          <li class="rightWall">
            <div class="window">
              <div class="leftWindowDoor"></div>
              <div class="rightWindowDoor"></div>
            </div>
          </li>
          <li class="rightSideWall"></li>

          <li class="backWall">
            <div class="photoFrame"><img src="https://raw.githubusercontent.com/saurabhsharma722/saurabhsharma722.github.com/master/demo/images/43D.jpg"/></div>
          </li>
          <li class="backSideWall"></li>

          <li class="topLeftRoof"></li>
          <li class="topRightRoof"></li>

          <li class="ground">
            <div class="groundGrass"></div>
          </li>
          <li class="roof"></li>
          <li class="bedbase"><img width="80" height="130" src="https://raw.githubusercontent.com/saurabhsharma722/saurabhsharma722.github.com/master/demo/images/bed.jpg"/></li>
          <li class="bedBackWall"></li>
          <li class="bedfrontWall"></li>
          <li class="bedLeftWall"></li>
          <li class="bedRightWall"></li>
        </ul>
      </div>
      <div class="moonContainer">
        <!--<div class="whiteMoon"></div>-->
        <div class="blackMoon"></div>
      </div>
    </div>
  </div>
  `
}

export { hutComponent };
