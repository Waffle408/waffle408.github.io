// Function to create and return a new module element
const createModule = (title, description, imageSrc, codeSnippet, link) => {
  const moduleDiv = document.createElement('div');
  moduleDiv.classList.add('module');
  moduleDiv.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <div class="code-block">
      <pre><code>${codeSnippet}</code></pre>
    </div>
    <img src="${imageSrc}" alt="${title}">
    <a href="${link}" class="btn">Learn More</a>
  `;
  return moduleDiv;
};
// Function to create and return the Plugins Module
const addPluginsModule = () => {
  const newModule = createModule(
    "STATS Plugin System", 
    "STATS supports an easy-to-use plugin system that allows you to extend the functionality of the platform. Whether you want to automate processes, integrate with other systems, or customize your experience, plugins help you enhance STATS.",
    "plugins.png",  // Example image path
    ``,
    "stats_plugins_module.html"  // Link to the plugins module page
  );

  // Get the container for the modules and append the new module
  const modulesContainer = document.getElementById('modules-container');
  modulesContainer.appendChild(newModule);
};

// Load the plugins module after the page is loaded
document.addEventListener('DOMContentLoaded', addPluginsModule);

// Example for adding a module (e.g., Real-Time Asset Tracking)
const addModule = () => {
  const newModule = createModule(
    "Real-Time Asset Tracking", 
    "STATS provides real-time tracking of all your assets, allowing you to always know where each asset is and who it's assigned to.",
    "assets/real-time-tracking.png",  // Example image path
    `<?php
// Real-Time Tracking Example
function trackAsset($assetId) {
    $asset = getAssetDetails($assetId); // Fetch asset details from the database
    echo "Asset ID: " . $asset['id'] . " - Status: " . $asset['status'];
}
trackAsset(274001708);`,
    "#"
  );
  const modulesContainer = document.getElementById('modules-container');
  modulesContainer.appendChild(newModule);
};

// Example for adding another module (e.g., Automated Email Alerts)
const addEmailAlertsModule = () => {
  const newModule = createModule(
    "Automated Email Alerts", 
    "STATS automatically sends email notifications to users when assets are due for return or are overdue.",
    "assets/email-alerts.png",  // Example image path
    `<?php
// Email Alert Example
function sendDueDateReminder($assetId, $userEmail) {
    $asset = getAssetDetails($assetId); // Get asset details
    $message = "Reminder: Your asset " . $asset['name'] . " is due for return.";
    mail($userEmail, "Asset Due Date Reminder", $message); // Send email
}
sendDueDateReminder(274001708, 'user@example.com');`,
    "#"
  );
  const modulesContainer = document.getElementById('modules-container');
  modulesContainer.appendChild(newModule);
};

// Function to add customer testimonials dynamically
const addTestimonial = () => {
  const testimonial = document.createElement('div');
  testimonial.classList.add('testimonial');
  testimonial.innerHTML = `
    <p>"STATS has completely transformed how we manage our assets. The real-time tracking and reports are invaluable!"</p>
    <p>- John Doe, IT Manager</p>
  `;
  const testimonialsContainer = document.getElementById('testimonials-container');
  testimonialsContainer.appendChild(testimonial);
};

// Function to load all modules when the page is ready
const loadModules = () => {
  // Add the first example module (Real-Time Asset Tracking)
  addModule();
  
  // Add the second example module (Automated Email Alerts)
  addEmailAlertsModule();
  
  // Add a testimonial
  addTestimonial();
};

// Wait for the DOM to be fully loaded before adding modules
document.addEventListener('DOMContentLoaded', loadModules);
