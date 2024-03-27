This application provides a URL shortening service, allowing users to encode URLs into shorter versions and decode them back to their original form. 
 Additionally, it offers functionality to check statistics for each shortened URL, such as the number of hits.

Routes:
Encode Route:
Endpoint: /encode
Method: POST
Description: Accepts a URL as input and generates a short URL for it.
Decode Route:
Endpoint: /decode
Method: POST
Description: Accepts a short URL and returns the original URL it represents.
Statistics Route:
Endpoint: /statistics/:shortUrl
Method: GET
Description: Retrieves statistics for a given short URL, such as the number of hits and other relevant information.

Running Tests:
To run the tests, execute the following command in your terminal: "npm run test"

This command utilizes Jest as the testing framework to execute the test suite. 
Make sure to install the dependencies by running "npm install" before running the tests.


HIRE MEEEEEEEEE!!!!