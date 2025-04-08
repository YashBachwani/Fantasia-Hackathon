
  const canvas = document.getElementById("timeChart");
  const ctx = canvas.getContext("2d");

  // Make the canvas responsive to its container
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const width = canvas.width;
  const height = canvas.height;

  // Updated points to span the entire canvas width and height
  const points = [
    [0, height * 0.8], 
    [width * 0.2, height * 0.6], 
    [width * 0.4, height * 0.4],
    [width * 0.6, height * 0.5],
    [width * 0.75, height * 0.2],
    [width * 0.9, height * 0.4],
    [width, height * 0.3]
  ];

  let currentSegment = 0;
  let t = 0;
  const speed = 0.04; // Faster animation

  function interpolate(p1, p2, t) {
    return [
      p1[0] + (p2[0] - p1[0]) * t,
      p1[1] + (p2[1] - p1[1]) * t
    ];
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);

    for (let i = 0; i < currentSegment; i++) {
      ctx.lineTo(points[i + 1][0], points[i + 1][1]);
    }

    if (currentSegment < points.length - 1) {
      const [x, y] = interpolate(points[currentSegment], points[currentSegment + 1], t);
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "#00bcd4";
    ctx.lineWidth = 4; // Increased line thickness
    ctx.stroke();

    // Animate to next point
    if (currentSegment < points.length - 1) {
      t += speed;
      if (t >= 1) {
        t = 0;
        currentSegment++;
      }
      requestAnimationFrame(animate);
    }
  }

  animate();
