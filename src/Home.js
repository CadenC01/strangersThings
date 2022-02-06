const Home = ({ user }) => {
  return (
    <div id="home">
      <h1>Take a look at stranger's things!</h1>
      {user ? <h1>Hi {user.username}</h1> : <h1>Please Login/Register</h1>}
    </div>
  );
};

export default Home;
