import { FaReact, FaTailwind, FaRedux } from "react-icons/fa";

const AppDescription = () => {
return (
<div>
<h1># FinanceApp</h1>

      <p>
        FinanceApp is an application that enables the simulation of buying and
        selling stocks from the most popular companies worldwide. My application
        focuses on providing a brokerage experience where you can track markets
        and invest in stocks.
      </p>

      <h2>Highlights</h2>

      <ul>
        <li>
          <span role="img" aria-label="rocket">🚀</span> **Optimized for All Devices:** The application has been carefully
          tailored to provide a smooth and responsive experience on devices of
          all types. (I'm particularly proud of the mobile version! 😄)
        </li>
        <li>
          <span role="img" aria-label="refresh">🔄</span> **Limited API Calls:** In the free version of the API I
          use, one refresh/page load consumes 5 API calls. Please be aware that
          there is a maximum limit of 5 API calls per minute in the free API, so
          try not to refresh the application frequently. Excessive refreshing
          may render the app non-functional, and you'll need to wait a minute
          before refreshing again. The application minimizes the number of API
          calls to adhere to limitations, avoiding unnecessary page refreshes.
        </li>
      </ul>

      <h2>Technologies</h2>

      <ul>
        <li>**React:** <FaReact style={{ verticalAlign: "middle", marginLeft: "5px" }} /></li>
        <li>**Tailwind CSS:** <FaTailwind style={{ verticalAlign: "middle", marginLeft: "5px" }} /></li>
        <li>**Redux:** <FaRedux style={{ verticalAlign: "middle", marginLeft: "5px" }} /></li>
      </ul>
     </div>

);
};

export default AppDescription;
