__How I approached__

I chose a HTML/CSS/JS implementation as I am currently most practiced in these.
Story 1 seemed the logical starting point as it appeared to add the greatest value and stories 2 and 4 were dependent on it. Although equally the data validation in story 3 could have been a valid starting point. I chose the order story 1, 2&4, 3.

I began attempting TDD with mocha and chai - however, I haven't used this technology before and I am new to TDD so i thought it would be ambitious to complete the project this way in the allotted time frame.

In total it took just over 2 hours of actual coding time to complete. I had some thinking time on top and also setting up my DEV environment as i am currently between laptops :).





__Provide a method of proving effectiveness__

My method of proving the effectiveness for the stories 1,2 and 4 is the GUI. By inspection its easy to see that the JSON file is being represented properly.

For story 3 I added a new version of the devices.json (uploaded here). It has many more devices added - each of which breaks a validation condition (not all conditions are broken, but each separate validation statement is tested). You can see the result from console entries when the page is loaded - a device name and model is printed and if valid has a 1 next to it, if invalid has a 0.

This mock data acts as my test cases.





__What i would do differently if i had more time__

If i had more time i would have not only removed invalid devices and printed them to console, but loaded them into a new JSON file. I was, however, already over time and didnt want to start a new piece.

With more time i would have liked to engage client to get a firmer idea of what it is being used for so i could focus detail on the most important features.

I would also include more testing and error handling as due to the short development time this  has not been extensively explored.

Features such as search hints and suggestions could be an improvement - however, depends on the client's usage.

For a larger device list i would look to use more intelligent searching rather than a loop through all devices. This might including storing the data in an indexed format and using something like a binary search to find the appropriate data.



Please open index.html in browser and ensure the html and js file are in the same location. The JSON file is pulled from the GitHub location.