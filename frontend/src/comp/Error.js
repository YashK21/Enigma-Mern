import React from "react";
import { useHistory } from "react-router-dom";
const Error = () => {
  const history = useHistory();
  const Home = () => {
    history.push("/login");
  };
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg"></div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>
                  <h2> Go Login then you can see me!</h2>

                  <button onClick={Home} className="link_404">
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
