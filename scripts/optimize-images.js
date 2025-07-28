/**
 * Image Optimization Script
 * Helps optimize images for the Rocky CRM project
 */

const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

/**
 * Check if image exists and is optimized
 */
function checkImage(imagePath) {
  const fullPath = path.join(IMAGES_DIR, imagePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Missing: ${imagePath}`);
    return false;
  }

  const stats = fs.statSync(fullPath);
  const sizeInKB = Math.round(stats.size / 1024);

  if (sizeInKB > 500) {
    console.log(`⚠️  Large file: ${imagePath} (${sizeInKB}KB)`);
    return false;
  }

  console.log(`✅ OK: ${imagePath} (${sizeInKB}KB)`);
  return true;
}

/**
 * Validate image structure
 */
function validateImageStructure() {
  console.log("🔍 Checking image structure...\n");

  const requiredImages = ["logos/rocky-logo.png"];

  let allGood = true;

  requiredImages.forEach((imagePath) => {
    if (!checkImage(imagePath)) {
      allGood = false;
    }
  });

  console.log("\n📋 Image structure validation complete!");

  if (allGood) {
    console.log("✅ All required images are present and optimized");
  } else {
    console.log("❌ Some images need attention");
  }

  return allGood;
}

/**
 * List all images in the project
 */
function listAllImages() {
  console.log("📁 All images in project:\n");

  function walkDir(dir, prefix = "") {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(IMAGES_DIR, fullPath);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        console.log(`${prefix}📁 ${item}/`);
        walkDir(fullPath, prefix + "  ");
      } else {
        const sizeInKB = Math.round(stats.size / 1024);
        console.log(`${prefix}📄 ${item} (${sizeInKB}KB)`);
      }
    });
  }

  if (fs.existsSync(IMAGES_DIR)) {
    walkDir(IMAGES_DIR);
  } else {
    console.log("❌ Images directory not found");
  }
}

// Run validation if script is executed directly
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case "validate":
      validateImageStructure();
      break;
    case "list":
      listAllImages();
      break;
    default:
      console.log("Usage: node scripts/optimize-images.js [validate|list]");
      console.log("\nCommands:");
      console.log("  validate  - Check required images and optimization");
      console.log("  list      - List all images in the project");
  }
}

module.exports = {
  validateImageStructure,
  listAllImages,
  checkImage,
};
