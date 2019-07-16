import * as React from 'react';
import {formEntry} from '../../types';

interface Props {
  handleSubmit: (entry: formEntry) => void
}

class AuthorizationScreen extends React.PureComponent<Props, null> {
  private _formRef: React.RefObject<HTMLFormElement>;

  constructor(props) {
    super(props);

    this._formRef = React.createRef();
    this._submitForm = this._submitForm.bind(this);
  }

  static formMapper(target) {
    return {
      name: (value) => {
        target.email = value;
        return target;
      },
      password: (value) => {
        target.password = value;
        return target;
      }
    };
  }

  static _processForm(formData) {
    const entry = {
      'email': ``,
      'password': ``
    };

    const FormMapper = AuthorizationScreen.formMapper(entry);
    for (const pair of formData.entries()) {

      const [property, value] = pair;
      if (FormMapper[property]) {

        value.trim();
        FormMapper[property](value);
      }
    }

    return entry;
  }

  _submitForm(e) {
    e.preventDefault();

    const form = this._formRef.current;
    const formData = new FormData(form);

    const newData = AuthorizationScreen._processForm(formData);
    this.props.handleSubmit(newData);
  }

  render() {
    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login__title">Необходима авторизация</h2>
        <p className="login__text">Представтесь!</p>
        <form className="login__form" action="" ref={this._formRef} method="post">
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input className="login__input" type="text" name="name" id="name" />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input className="login__input" type="text" name="password" id="password" />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button"
            type="submit"
            style={{zIndex: 5}}
            onClick={this._submitForm}>Войти</button>
        </form>
      </section>);
  }
}

export default AuthorizationScreen;
