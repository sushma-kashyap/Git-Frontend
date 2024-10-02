import React from "react";
import { useEffect, useState } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repositories);
      } catch (err) {
        console.error("Error while fecthing repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
        //console.log(data);
        // setSuggestedRepositories(data.repositories);
         console.log(suggestedRepositories);
      } catch (err) {
        console.error("error while fetching suggested  repositories");
      }
    };
    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);
  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside id="left-side">
          <h2>Suggested Repositories</h2>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
              </div>
            );
          })}
        </aside>
        

        <main>
          <h3>Your Repositories</h3>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          {searchResults && searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            );
          })}
        </main>

        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech conference -Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup -Dec 18</p>
            </li>
            <li>
              <p>React submit -jan 15</p>
            </li>
            <li>
              <p>Tech fasion -feb 25</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
