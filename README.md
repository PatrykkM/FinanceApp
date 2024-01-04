<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    #app-description {
      margin-bottom: 20px;
    }

    #highlights, #technologies {
      margin-bottom: 20px;
    }

    .technology {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .technology img {
      margin-right: 10px;
    }

  </style>
</head>
<body>

<div id="app-description">
  <h1>FinanceApp</h1>
  <p>
    FinanceApp is an application that enables the simulation of buying and selling stocks from the most popular companies worldwide.
    My application focuses on providing a brokerage experience where you can track markets and invest in stocks.
  </p>
</div>

<div id="highlights">
  <h2>Highlights</h2>

  <div class="highlight">
    <span>🚀 Optimized for All Devices:</span>
    <p>
      The application has been carefully tailored to provide a smooth and responsive experience on devices of all types.
      (I'm particularly proud of the mobile version! 😄)
    </p>
  </div>

  <div class="highlight">
    <span>🔄 Limited API Calls:</span>
    <p>
      In the free version of the API I use, one refresh/page load consumes 5 API calls.
      Please be aware that there is a maximum limit of 5 API calls per minute in the free API,
      so try not to refresh the application frequently. Excessive refreshing may render the app non-functional,
      and you'll need to wait a minute before refreshing again. The application minimizes the number of API calls
      to adhere to limitations, avoiding unnecessary page refreshes.
    </p>
  </div>
</div>

<div id="technologies">
  <h2>Technologies</h2>

  <div class="technology">
    <img src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white" alt="React">
    <span>React</span>
  </div>

  <div class="technology">
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <span>Tailwind CSS</span>
  </div>

  <div class="technology">
    <img src="https://img.shields.io/badge/-Redux-764ABC?style=flat&logo=redux&logoColor=white" alt="Redux">
    <span>Redux</span>
  </div>
</div>

</body>
</html>
