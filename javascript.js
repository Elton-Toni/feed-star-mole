const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;
const wormContainer = document.querySelector(".worm-container");

// const MAX_SCORE = 100;
let score = 0;

const getGoneInterval = () =>
  Date.now() + Math.floor(Math.random() * MAX_INTERVAL) + MIN_INTERVAL;
const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;
// const getHungryInterval = () =>
//   Date.now() + Math.floor(Math.random() * 3000) + HUNGRY_INTERVAL;

const getKingStatus = () => Math.random() > 0.9; // returns true or false

const moles = [
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(), // true or false
    node: document.querySelector("#hole-0"),
    // node: document.getElementById("hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-3"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-7"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-8"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: getKingStatus(),
    node: document.getElementById("hole-9"),
  },
];

const getNextStatus = mole => {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.children[0].src = "../mole/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "../mole/mole-leaving.png";
      }
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      // mole.node.children[0].classList.toggle("gone", true);
      mole.node.children[0].classList.add("gone");
      // mole.king = false;
      break;
    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      // mole.node.children[0].classList.toggle("hungry", true);
      mole.node.children[0].classList.add("hungry");
      // mole.node.children[0].classList.toggle("gone", false);
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        mole.node.children[0].src = "../mole/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "../mole/mole-hungry.png";
      }
      break;
    case "hungry":
      // mole.node.children[0].classList.toggle("hungry", false);
      mole.node.children[0].classList.remove("hungry");
      mole.next = getSadInterval();
      mole.status = "sad";
      if (mole.king) {
        mole.node.children[0].src = "../mole/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "../mole/mole-sad.png";
      }
      break;
  }
};

const feed = e => {
  if (e.target.tagName !== "IMG" || !e.target.classList.contains("hungry")) {
    return;
  }

  // cfr. <img data-index="2" src="../mole/king-mole-hungry.png" alt="mole" class="mole"> --> e.target.dataset.index grabs the data-index in <img/> tag, in this case it's "2" (a string)
  // const mole = moles[parseInt(e.target.dataset.index)];
  const mole = moles[+e.target.dataset.index];

  mole.status = "fed";
  mole.next = getSadInterval();
  // mole.node.children[0].classList.toggle("hungry", false);
  mole.node.children[0].classList.remove("hungry");
  if (mole.king) {
    mole.node.children[0].src = "../mole/king-mole-fed.png";
    score += 20;
  } else {
    mole.node.children[0].src = "../mole/mole-fed.png";
    score += 10;
  }

  console.log(score);
  // if (score >= MAX_SCORE) {
  if (score >= 100) {
    win();
    return;
  }

  wormContainer.style.width = `${score}%`;
  // document.querySelector('.worm-container').style.width=`${10 * score}%`
};

const win = () => {
  // document.querySelector(".bg").classList.toggle("hide", true);
  document.querySelector(".bg").classList.add("hide");
  // document.querySelector(".win").classList.toggle("show", true);
  document.querySelector(".win").classList.remove("hide");
};

document.querySelector(".bg").addEventListener("click", feed);

const nextFrame = () => {
  const now = Date.now();
  for (let i = 0; i < moles.length; i++) {
    if (moles[i].next < now) {
      getNextStatus(moles[i]);
    }
  }
  requestAnimationFrame(nextFrame);
};

nextFrame();
// requestAnimationFrame(nextFrame);
