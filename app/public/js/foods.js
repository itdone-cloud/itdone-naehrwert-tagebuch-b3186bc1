/* Nährwerte pro 100 g: protein, ballaststoffe, fett, zucker, kcal (g / g / g / g / kcal) */
window.FOOD_DB = [
  // Obst
  { name: "Apfel", cat: "Obst", protein: 0.3, fiber: 2.4, fett: 0.2, zucker: 10.4, kcal: 52 },
  { name: "Banane", cat: "Obst", protein: 1.1, fiber: 2.6, fett: 0.3, zucker: 12.2, kcal: 89 },
  { name: "Erdbeeren", cat: "Obst", protein: 0.7, fiber: 2.0, fett: 0.3, zucker: 4.9, kcal: 32 },
  { name: "Orange", cat: "Obst", protein: 0.9, fiber: 2.4, fett: 0.1, zucker: 9.4, kcal: 47 },
  { name: "Weintrauben", cat: "Obst", protein: 0.6, fiber: 0.9, fett: 0.2, zucker: 16.0, kcal: 69 },
  { name: "Birne", cat: "Obst", protein: 0.4, fiber: 3.1, fett: 0.1, zucker: 10.0, kcal: 57 },
  { name: "Blaubeeren", cat: "Obst", protein: 0.7, fiber: 2.4, fett: 0.3, zucker: 10.0, kcal: 57 },
  { name: "Ananas", cat: "Obst", protein: 0.5, fiber: 1.4, fett: 0.1, zucker: 10.0, kcal: 50 },
  { name: "Mango", cat: "Obst", protein: 0.8, fiber: 1.6, fett: 0.4, zucker: 14.8, kcal: 60 },
  { name: "Kiwi", cat: "Obst", protein: 1.1, fiber: 3.0, fett: 0.5, zucker: 9.0, kcal: 61 },
  { name: "Avocado", cat: "Obst", protein: 2.0, fiber: 6.7, fett: 15.0, zucker: 0.7, kcal: 160 },

  // Gemüse
  { name: "Brokkoli", cat: "Gemüse", protein: 2.8, fiber: 2.6, fett: 0.4, zucker: 1.7, kcal: 34 },
  { name: "Karotte", cat: "Gemüse", protein: 0.9, fiber: 2.8, fett: 0.2, zucker: 4.7, kcal: 41 },
  { name: "Tomate", cat: "Gemüse", protein: 0.9, fiber: 1.2, fett: 0.2, zucker: 2.6, kcal: 18 },
  { name: "Gurke", cat: "Gemüse", protein: 0.7, fiber: 0.5, fett: 0.1, zucker: 1.7, kcal: 15 },
  { name: "Paprika (rot)", cat: "Gemüse", protein: 1.0, fiber: 2.1, fett: 0.3, zucker: 4.2, kcal: 31 },
  { name: "Spinat", cat: "Gemüse", protein: 2.9, fiber: 2.2, fett: 0.4, zucker: 0.4, kcal: 23 },
  { name: "Zwiebel", cat: "Gemüse", protein: 1.1, fiber: 1.7, fett: 0.1, zucker: 4.2, kcal: 40 },
  { name: "Kartoffel (gekocht)", cat: "Gemüse", protein: 2.0, fiber: 1.8, fett: 0.1, zucker: 0.8, kcal: 87 },
  { name: "Blumenkohl", cat: "Gemüse", protein: 1.9, fiber: 2.0, fett: 0.3, zucker: 1.9, kcal: 25 },
  { name: "Zucchini", cat: "Gemüse", protein: 1.2, fiber: 1.0, fett: 0.3, zucker: 2.5, kcal: 17 },
  { name: "Süßkartoffel", cat: "Gemüse", protein: 1.6, fiber: 3.0, fett: 0.1, zucker: 4.2, kcal: 86 },
  { name: "Rote Bete", cat: "Gemüse", protein: 1.6, fiber: 2.8, fett: 0.2, zucker: 6.8, kcal: 43 },

  // Getreide & Beilagen
  { name: "Vollkornbrot", cat: "Getreide", protein: 8.5, fiber: 7.0, fett: 3.3, zucker: 2.6, kcal: 246 },
  { name: "Weißbrot", cat: "Getreide", protein: 9.0, fiber: 2.7, fett: 3.2, zucker: 5.0, kcal: 265 },
  { name: "Haferflocken", cat: "Getreide", protein: 13.5, fiber: 10.0, fett: 7.0, zucker: 1.0, kcal: 372 },
  { name: "Reis (gekocht)", cat: "Getreide", protein: 2.7, fiber: 0.4, fett: 0.3, zucker: 0.1, kcal: 130 },
  { name: "Vollkornreis (gekocht)", cat: "Getreide", protein: 2.6, fiber: 1.8, fett: 0.9, zucker: 0.2, kcal: 123 },
  { name: "Nudeln (gekocht)", cat: "Getreide", protein: 5.8, fiber: 1.8, fett: 0.9, zucker: 0.6, kcal: 158 },
  { name: "Vollkornnudeln (gekocht)", cat: "Getreide", protein: 5.3, fiber: 3.9, fett: 1.1, zucker: 0.8, kcal: 124 },
  { name: "Quinoa (gekocht)", cat: "Getreide", protein: 4.4, fiber: 2.8, fett: 1.9, zucker: 0.9, kcal: 120 },
  { name: "Couscous (gekocht)", cat: "Getreide", protein: 3.8, fiber: 1.4, fett: 0.2, zucker: 0.1, kcal: 112 },

  // Milchprodukte
  { name: "Naturjoghurt (3,5%)", cat: "Milchprodukte", protein: 3.5, fiber: 0.0, fett: 3.5, zucker: 4.7, kcal: 66 },
  { name: "Magerquark", cat: "Milchprodukte", protein: 12.0, fiber: 0.0, fett: 0.2, zucker: 3.4, kcal: 66 },
  { name: "Vollmilch", cat: "Milchprodukte", protein: 3.3, fiber: 0.0, fett: 3.6, zucker: 4.8, kcal: 64 },
  { name: "Käse (Gouda)", cat: "Milchprodukte", protein: 25.0, fiber: 0.0, fett: 27.0, zucker: 0.0, kcal: 356 },
  { name: "Hüttenkäse", cat: "Milchprodukte", protein: 11.0, fiber: 0.0, fett: 4.3, zucker: 2.7, kcal: 98 },
  { name: "Ei (gekocht)", cat: "Milchprodukte", protein: 13.0, fiber: 0.0, fett: 11.0, zucker: 1.1, kcal: 155 },

  // Fleisch & Fisch
  { name: "Hähnchenbrust (gegart)", cat: "Fleisch & Fisch", protein: 31.0, fiber: 0.0, fett: 3.6, zucker: 0.0, kcal: 165 },
  { name: "Rinderhack (mager, gebraten)", cat: "Fleisch & Fisch", protein: 26.0, fiber: 0.0, fett: 15.0, zucker: 0.0, kcal: 254 },
  { name: "Lachs (gegart)", cat: "Fleisch & Fisch", protein: 25.0, fiber: 0.0, fett: 13.0, zucker: 0.0, kcal: 208 },
  { name: "Thunfisch (in Wasser)", cat: "Fleisch & Fisch", protein: 26.0, fiber: 0.0, fett: 1.0, zucker: 0.0, kcal: 116 },
  { name: "Pute (gegart)", cat: "Fleisch & Fisch", protein: 29.0, fiber: 0.0, fett: 2.0, zucker: 0.0, kcal: 135 },

  // Hülsenfrüchte & Nüsse
  { name: "Linsen (gekocht)", cat: "Hülsenfrüchte & Nüsse", protein: 9.0, fiber: 7.9, fett: 0.4, zucker: 1.8, kcal: 116 },
  { name: "Kichererbsen (gekocht)", cat: "Hülsenfrüchte & Nüsse", protein: 8.9, fiber: 7.6, fett: 2.6, zucker: 4.8, kcal: 164 },
  { name: "Kidneybohnen (gekocht)", cat: "Hülsenfrüchte & Nüsse", protein: 8.7, fiber: 6.4, fett: 0.5, zucker: 0.3, kcal: 127 },
  { name: "Mandeln", cat: "Hülsenfrüchte & Nüsse", protein: 21.0, fiber: 12.5, fett: 49.0, zucker: 4.8, kcal: 579 },
  { name: "Walnüsse", cat: "Hülsenfrüchte & Nüsse", protein: 15.0, fiber: 6.7, fett: 65.0, zucker: 2.6, kcal: 654 },
  { name: "Erdnussbutter", cat: "Hülsenfrüchte & Nüsse", protein: 25.0, fiber: 6.0, fett: 50.0, zucker: 6.0, kcal: 588 },
  { name: "Chiasamen", cat: "Hülsenfrüchte & Nüsse", protein: 17.0, fiber: 34.0, fett: 31.0, zucker: 0.0, kcal: 486 },

  // Fertige Gerichte
  { name: "Spaghetti Bolognese", cat: "Gerichte", protein: 6.0, fiber: 1.5, fett: 5.0, zucker: 2.0, kcal: 150 },
  { name: "Caesar Salat mit Hähnchen", cat: "Gerichte", protein: 8.0, fiber: 1.2, fett: 9.0, zucker: 1.5, kcal: 140 },
  { name: "Gemüsepfanne", cat: "Gerichte", protein: 3.0, fiber: 3.0, fett: 4.0, zucker: 3.0, kcal: 80 },
  { name: "Müsli mit Milch", cat: "Gerichte", protein: 5.0, fiber: 3.5, fett: 4.0, zucker: 8.0, kcal: 140 },
  { name: "Linsensuppe", cat: "Gerichte", protein: 5.0, fiber: 3.0, fett: 2.0, zucker: 1.0, kcal: 70 },
  { name: "Hähnchen-Curry mit Reis", cat: "Gerichte", protein: 9.0, fiber: 1.2, fett: 6.0, zucker: 3.0, kcal: 160 },
  { name: "Pfannkuchen", cat: "Gerichte", protein: 6.0, fiber: 0.8, fett: 8.0, zucker: 4.0, kcal: 180 },
  { name: "Falafel", cat: "Gerichte", protein: 8.0, fiber: 5.0, fett: 12.0, zucker: 1.0, kcal: 230 },
  { name: "Pizza Margherita", cat: "Gerichte", protein: 11.0, fiber: 2.0, fett: 10.0, zucker: 3.0, kcal: 250 },
  { name: "Burger (Rind, mit Brötchen)", cat: "Gerichte", protein: 14.0, fiber: 1.5, fett: 15.0, zucker: 4.0, kcal: 270 },
  { name: "Sushi (gemischt)", cat: "Gerichte", protein: 6.0, fiber: 0.5, fett: 2.0, zucker: 3.0, kcal: 150 },
  { name: "Gemüsecurry mit Kokosmilch", cat: "Gerichte", protein: 3.0, fiber: 2.5, fett: 8.0, zucker: 3.0, kcal: 110 },
  { name: "Omelett mit Gemüse", cat: "Gerichte", protein: 10.0, fiber: 0.8, fett: 9.0, zucker: 1.0, kcal: 130 },

  // Snacks & Süßes
  { name: "Schokolade (Vollmilch)", cat: "Snacks & Süßes", protein: 7.6, fiber: 3.4, fett: 30.0, zucker: 51.0, kcal: 534 },
  { name: "Gummibärchen", cat: "Snacks & Süßes", protein: 6.9, fiber: 0.0, fett: 0.1, zucker: 46.0, kcal: 343 },
  { name: "Chips (Kartoffel)", cat: "Snacks & Süßes", protein: 6.0, fiber: 4.4, fett: 35.0, zucker: 0.5, kcal: 536 },
  { name: "Butterkekse", cat: "Snacks & Süßes", protein: 6.0, fiber: 2.0, fett: 16.0, zucker: 25.0, kcal: 450 },
  { name: "Honig", cat: "Snacks & Süßes", protein: 0.3, fiber: 0.2, fett: 0.0, zucker: 82.0, kcal: 304 },
  { name: "Marmelade", cat: "Snacks & Süßes", protein: 0.3, fiber: 0.9, fett: 0.1, zucker: 48.0, kcal: 250 },

  // Getränke
  { name: "Apfelsaft", cat: "Getränke", protein: 0.1, fiber: 0.2, fett: 0.1, zucker: 10.0, kcal: 46 },
  { name: "Orangensaft", cat: "Getränke", protein: 0.7, fiber: 0.2, fett: 0.2, zucker: 8.4, kcal: 45 },
  { name: "Cola", cat: "Getränke", protein: 0.0, fiber: 0.0, fett: 0.0, zucker: 10.6, kcal: 42 },
  { name: "Limonade", cat: "Getränke", protein: 0.0, fiber: 0.0, fett: 0.0, zucker: 9.0, kcal: 38 },

  // Öle & Fette
  { name: "Olivenöl", cat: "Öle & Fette", protein: 0.0, fiber: 0.0, fett: 100.0, zucker: 0.0, kcal: 884 },
  { name: "Butter", cat: "Öle & Fette", protein: 0.9, fiber: 0.0, fett: 81.0, zucker: 0.1, kcal: 717 }
];
