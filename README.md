# <span style="color:#0ec2b8">_Last Call_</span>

#### _Last Call website, 12/03/2020_

#### By _**Eric Endsley, Agata Kolodziej, Joseph Nero, Constantine Yakubovski, Nataliya Zhuravleva**_

## <span style="color:#0ec2b8">Description</span>

_The Last Call website helps people to know more about beer, suggests beer that user should try, and finds breweries nearby. <br>
The website contains the next pages:_

1. _Age verification_ - It checks the user age. User must be 21 years or older.
2. _Beer 101_ - This is informational page about beer history, how beer is made, ingredients, key beer terms, types of beer.
3. _Location_ - Location page helps the user to find breweries neaby.
4. _Quiz_ - Quiz page processes the user responses and suggests beer the user should try.

## <span style="color:#0ec2b8">Setup/Installation Requirements</span>

### <span style="color:#c4f4ef">View Online</span>

_Visit [Last Call webpage](https://joey3001.github.io/LastCall/) at https://joey3001.github.io/LastCall/_ to view application on GitHub pages.\_

### <span style="color:#c4f4ef">Open Locally</span>

1. _Navigate to the [Last Call repo](https://github.com/joey3001/LastCall) at https://github.com/joey3001/LastCall_ to view the project files and commits.
2. _Click on the green button labeled "Code"_ to copy repository URL.
3. _Clone the repository to your local machine_ by opening your machine terminal and using the command "git clone https://github.com/joey3001/LastCall".
4. _Create API Keys (see instruction below)_
5. _Place your tokens in an .env file at the top level of your directory. Name your API key variables API_KEY and API_KEY2 in .env. Keep spelling and capitalization identical as shown below: 

            e.g. API_KEY=your API Key

6. Include .env in .gitignore file.

### <span style="color:#c4f4ef">Creating API Key</span>

_To use this application, you will need to make two accounts and get an API keys. The "Free Plan" for the mapquest API allows for 1500 API calls per month. The Beer Mapping API is does not limit the number of API calls you can make with their "Free Plan."_ 

1. __Visit the [Beer Mapping API Site](https://beermapping.com/api/). Click on the "Sign Up" Button and create an account._
2. _At this point, you'll be able to access a dashboard that includes your API key._
3. Set your beer mapping API key to a variable name "API_KEY" in  your .env file as shown below: 

            API_KEY=12312312jlsfajsdiofjo

4. _Visit the [Mapquest API Site](https://developer.mapquest.com/). Click on the "Get your Free API Key" Button and create an account._
5. _At this point, you'll be able to access a dashboard that includes your API key as well as your remaining API calls for the month._
6. Set your mapquest API key to a variable name "API_KEY2" in  your .env file as shown below: 

            API_KEY2=fdagaddga123123sfajsdiofjo

## <span style="color:#0ec2b8">Known Bugs</span>

_Location page doesn't show information about breweries in WA, FL, due to broken API Endpoints_
_This bag was made known to the API developers_

_Links to brewery webpages attempt to open the url address locally_ 

## <span style="color:#0ec2b8">Support and contact details</span>

_If you have any questions, ideas or concerns, please, contact us by email:_ <br>
Eric Endsley at [eric.endsley4@gmail.com](mailto:eric.endsley4@gmail.com)<br>
Agata Kolodziej at [agatakolohe@gmail.com](mailto:agatakolohe@gmail.com)<br>
Joseph Nero at [josephnero111@gmail.com](mailto:josephnero111@gmail.com)<br>
Constantine Yakubovski at [faustlarsen@gmail.com](mailto:faustlarsen@gmail.com)<br>
Nataliya Zhuravleva at [natalindria@gmail.com](mailto:natalindria@gmail.com)

## <span style="color:#0ec2b8">Technologies Used</span>

- _VisualStudio Code_
- _Git_
- _GitHub_
- _HTML/CSS/Bootstrap_
- _JavaScript/jQuery_
- _API_
- _Webpack_
- _Node_
- _Npm_
- _ESLint_
- _Jest_

### <span style="color:#0ec2b8">Beer Quiz Specs for Developer Using</span>

- Beer options:
  - IPAs: color:golden/amber(2,3), IBU: 50-70(4), ABV: 6-10%, Clarity: clear(1), Flavor: Hoppy, citrus, pine, danky(100)
  - Pilsner: color:light(1), IBU: 25-35(3), ABV: 4.5-5%, Clarity: clear(1), Flavor: crisp, mild, light(200)
  - Hefenweizen/wheat beer color: golden(2), IBU: 5-10, ABV: 4-7%, Clarity: hazy(2), Flavor: sweet, fruity, banana, clove(300)
  - Pale Ales color: amber(3), IBU: 10-20(2), ABV: 5%, Clarity: clear(2), Flavor: hop-forward, malty(400)
  - Brown Ales color: brown(4), IBU: 18-35(3), ABV: 5-6%, Clarity: pretty clear(2), Flavor: carmamel, chocolate, toasty(500)
  - Stouts; color: black(5), IBU: 10-20(2), ABV: 4-5%, Clarity: both(1,2), Flavor: strong roasted malt, coffee, dark chocolate(600)
  - Sours color: red(6), IBU: 0-10, ABV: 3-5%(1), Clarity: Can be hazy(1,2), Flavor: sour, tart, acidic(700)

### <span style="color:#0ec2b8">License</span>

_This software is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license_

Copyright (c) 2020 **_Eric Endsley, Agata Kolodziej, Joseph Nero, Constantine Yakubovski, Nataliya Zhuravleva_**
