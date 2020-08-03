import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const withCookies = WrappedComponent => {
  const HOC = props => {
    const userCookies = cookies.get('userCookies');

    let language, direction, token, role;

    if (!userCookies) {
      language = 'en';
      direction = 'ltr';
      token = '';
      role = '';
    } else {
      language = userCookies.language;
      direction = userCookies.direction;
      token = userCookies.token;
      role = userCookies.role;
    }

    if (language) {
      return (
        <WrappedComponent
          c_language={language}
          c_direction={direction}
          c_token={token}
          c_role={role}
          {...props}
        />
      );
    } else return <> </>;
  };

  return HOC;
};

export default withCookies;
