function getRandomDarkColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 50 + Math.random() * 30; // 50–80%
  const lightness = 10 + Math.random() * 10;  // 10–20%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function setupManualSVGExport() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", 612); // 8.5 inches in points
  svg.setAttribute("height", 792); // 11 inches in points
  svg.setAttribute("xmlns", svgNS);
  svg.style.background = getRandomDarkColor(); // Random dark background

  // Gradient for shiny stars
  const defs = document.createElementNS(svgNS, "defs");
  const gradient = document.createElementNS(svgNS, "linearGradient");
  gradient.setAttribute("id", "shinyGradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "yellow");
  stop1.setAttribute("stop-opacity", "1");

  const stop2 = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "white");
  stop2.setAttribute("stop-opacity", "0.5");

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);

  // Add thin cross-shaped stars
  for (let i = 0; i < 45; i++) {
    const star = document.createElementNS(svgNS, "polygon");
    const cx = Math.random() * 612;
    const cy = Math.random() * 792;
    const size = Math.random() * 12 + 12; // long arms
    const thickness = size * 0.1;         // thin beams

    const points = [
      `${cx},${cy - size}`,              // Top
      `${cx + thickness},${cy - thickness}`,
      `${cx + size},${cy}`,              // Right
      `${cx + thickness},${cy + thickness}`,
      `${cx},${cy + size}`,              // Bottom
      `${cx - thickness},${cy + thickness}`,
      `${cx - size},${cy}`,              // Left
      `${cx - thickness},${cy - thickness}`
    ].join(" ");

    star.setAttribute("points", points);
    star.setAttribute("fill", "url(#shinyGradient)");
    svg.appendChild(star);
  }

  // Sonnet text variants
const sonnetVariants = [
  [
    "VNthrifty louelineſſe why doſt thou ſpend,",
    "Vpon thy ſelfe thy beauties legacy?",
    "Natures bequeſt giues nothing but doth lend,",
    "And being franck ſhe lends to thoſe are free:",
    "Then beautious nigard why dooſt thou abuſe,",
    "The bountious largeſſe giuen thee to give?",
    "Profitles vſerer why dooſt thou vſe",
    "So great a ſumme of ſummes yet can’ſt not liue?",
    "For hauing traffike with thy ſelfe alone,",
    "Thou of thy ſelfe thy ſweet ſelfe doſt deceaue,",
    "Then how when nature calls thee to be gone,",
    "What acceptable Audit can’ſt thou leaue?",
    "Thy vnuſ’d beauty muſt be tomb’d with thee,",
    "Which vſed liues th’executor to be."
  ],
  [
    "Wasteful youth, why do you squander on yourself",
    "the riches that you should leave to the world?",
    "Nature gives nothing but only makes a loan",
    "and, being generous, she lends only to those who are open-hearted.",
    "Then, beautiful miser, why do you abuse",
    "the generous inheritance given to you to leave to someone else?",
    "Unsuccessful money-lender,",
    "why do you spend such great sums when you can’t live forever,",
    "by thinking of yourself only?",
    "You are only cheating yourself,",
    "so, when nature calls you away",
    "what reasonable account will you be able to give of yourself?",
    "Your unused seed will have to be buried with you,",
    "which, if used, would live as the administrator of your beauty."
  ]
];

// Pick one randomly
const sonnetLines = sonnetVariants[Math.floor(Math.random() * sonnetVariants.length)];


  const lineHeight = 30;
  const totalHeight = sonnetLines.length * lineHeight;
  const centerY = 396 - totalHeight / 2 + lineHeight / 2;

  for (let i = 0; i < sonnetLines.length; i++) {
    const line = sonnetLines[i];
    const y = centerY + i * lineHeight;
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", 306);
    text.setAttribute("y", y);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "14");
    text.setAttribute("fill", "white");
    text.setAttribute("font-family", "EB Garamond, serif");
    text.textContent = line;
    svg.appendChild(text);
  }

  // Scatter title words along edges
  const titleWords = "Sonnet 4: Unthrifty Loveliness, Why Dost Thou Spend".split(" ");
  const fontSize = 18;
  const margin = 10;

  titleWords.forEach(word => {
    const estWidth = word.length * fontSize * 0.6;
    const estHeight = fontSize;

    const edge = Math.random();
    let randomX, randomY;

    if (edge < 0.25) {
      // Top edge
      randomX = Math.random() * (612 - estWidth - 2 * margin) + (estWidth / 2 + margin);
      randomY = Math.random() * 108 + estHeight + margin;
    } else if (edge < 0.5) {
      // Bottom edge
      randomX = Math.random() * (612 - estWidth - 2 * margin) + (estWidth / 2 + margin);
      randomY = 792 - Math.random() * 108 - margin;
    } else if (edge < 0.75) {
      // Left edge
      randomX = estWidth / 2 + margin;
      randomY = Math.random() * (792 - estHeight - 2 * margin) + (estHeight + margin);
    } else {
      // Right edge
      randomX = 612 - estWidth / 2 - margin;
      randomY = Math.random() * (792 - estHeight - 2 * margin) + (estHeight + margin);
    }

    const wordElement = document.createElementNS(svgNS, "text");
    wordElement.setAttribute("x", randomX);
    wordElement.setAttribute("y", randomY);
    wordElement.setAttribute("text-anchor", "middle");
    wordElement.setAttribute("font-size", fontSize);
    wordElement.setAttribute("fill", "white");
    wordElement.setAttribute("font-family", "EB Garamond, serif");
    wordElement.textContent = word;
    svg.appendChild(wordElement);
  });

  document.body.appendChild(svg);

  // Save button
  const button = document.createElement("button");
  button.textContent = "Save SVG";
  button.onclick = () => {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sonnet_poster.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  document.body.appendChild(button);
}

window.onload = setupManualSVGExport;