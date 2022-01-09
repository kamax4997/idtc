import React from 'react'

const Header: React.FC = () => {

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__wrapper">
            <a href="/">
              {/* eslint-disable-next-line */}
              <img className="header__logo" src="https://media-exp1.licdn.com/dms/image/C4D0BAQFSY2aJKDloWQ/company-logo_200_200/0/1580210342173?e=1649894400&v=beta&t=yuLfZa6K0u8RY2kLElO65bHZsGKwePRhpLXkIvwhmlM" alt="Logo" />
            </a>
          </div>
          <div className="header__title">
            <h3>IDT Corporation</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
