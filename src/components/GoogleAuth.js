import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
const CLIENT_ID =
  '78388190064-dejeoqlfn207989pb2ddqu76chtbf62i.apps.googleusercontent.com';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email',
      });
      this.auth = window.gapi.auth2.getAuthInstance();

      // Update the Redux state
      this.onAuthChange(this.auth.isSignedIn.get());

      //  A listener to invoke a function when the "isSignedIn" state is changed
      this.auth.isSignedIn.listen(this.onAuthChange);
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) return null;

    return isSignedIn ? (
      <button className="ui red google button" onClick={this.onSignOutClick}>
        <i className="google icon" />
        Sign Out
      </button>
    ) : (
      <button className="ui green google button" onClick={this.onSignInClick}>
        <i className="google icon"></i>
        Sign In with Google
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { isSignedIn: auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
