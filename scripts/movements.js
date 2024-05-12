// Check if the current page is the index page
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  // Define topics (ideas)
  const ideas = ['Idea A', 'Idea B', 'Idea C', 'Idea D'];

  // Create the center user
  const centerUser = document.querySelector('.center-user');

  // Define oval parameters
  const ovalWidth = 300; // Width of the oval
  const ovalHeight = 200; // Height of the oval
  const angleOffset = Math.PI / 8; // Offset for starting angle

  // Array to store rotation intervals
  const rotationIntervals = [];

  // Function to remove all rotation intervals
  function removeRotationIntervals() {
    rotationIntervals.forEach(interval => clearInterval(interval));
  }

  // Function to calculate idea position
  function calculateIdeaPosition(index, time) {
    const centerX = centerUser.offsetLeft + centerUser.offsetWidth / 2;
    const centerY = centerUser.offsetTop + centerUser.offsetHeight / 2;
    const angle = angleOffset + (index / ideas.length) * (2 * Math.PI - angleOffset * 2);
    const x = centerX + ovalWidth / 2 * Math.cos(angle + time / 1000 + index * 0.1);
    const y = centerY + ovalHeight / 2 * Math.sin(angle + time / 1000 + index * 0.1);
    return { x, y };
  }

  // Create ideas clouds rotating around the user in an oval shape
  ideas.forEach((idea, index) => {
    const cloud = document.createElement('div');
    cloud.classList.add('idea');
    cloud.textContent = idea;
    document.body.appendChild(cloud);

    // Rotate clouds around the user
    const rotateCloud = () => {
      const time = Date.now();
      const { x, y } = calculateIdeaPosition(index, time);
      cloud.style.left = x + 'px';
      cloud.style.top = y + 'px';
    };

    let rotationInterval = setInterval(rotateCloud, 50); // Rotate the cloud
    rotationIntervals.push(rotationInterval); // Push rotation interval to the array

    let mouseIsOver = false;

    // Stop rotation when mouse is over an idea or center user
    cloud.addEventListener('mouseenter', () => {
      clearInterval(rotationInterval);
      mouseIsOver = true;
    });

    cloud.addEventListener('mouseleave', () => {
      rotationInterval = setInterval(rotateCloud, 50);
      mouseIsOver = false;
    });

    centerUser.addEventListener('mouseenter', () => {
      clearInterval(rotationInterval);
      mouseIsOver = true;
    });

    centerUser.addEventListener('mouseleave', () => {
      rotationInterval = setInterval(rotateCloud, 50);
      mouseIsOver = false;
    });
  });

  // Remove rotation intervals before unloading the page
  window.addEventListener('beforeunload', removeRotationIntervals);
}
