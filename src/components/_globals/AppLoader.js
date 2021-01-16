import React from 'react'
import Loader from 'react-loader-spinner'


class AppLoader extends React.Component {
  render() {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center mb-auto">
          <Loader
            type="ThreeDots"
            color="#aaa"
            height={100}
            width={100}
            timeout={5000} //3 secs
          />
        </div>
      </>

    )
  }

}

export default AppLoader
