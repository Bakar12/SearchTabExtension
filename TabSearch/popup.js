// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    var searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', searchTabs);
});

// Function to search for tabs based on the input value
function searchTabs() {
    var query = document.getElementById('searchBox').value;
    chrome.tabs.query({}, function(tabs) {
        // Filter tabs based on the query
        var matchingTabs = tabs.filter(tab => tab.title.toLowerCase().includes(query.toLowerCase()));
        displayResults(matchingTabs);
    });
}

// Function to display the search results
function displayResults(tabs) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    tabs.forEach(function(tab) {
        var tabElement = document.createElement('div');
        tabElement.textContent = tab.title;
        tabElement.onclick = function() {
            // Update the selected tab and close the popup window
            chrome.tabs.update(tab.id, {active: true});
            window.close();
        };
        resultsDiv.appendChild(tabElement);
    });
}
