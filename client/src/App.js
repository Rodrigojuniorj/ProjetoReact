import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

function App() {
  //criando função de submit
  const handleClickRegister = (values) => {
    Axios.post("http://rodrigodev.ninja:3000/cliente/cadastro", {
      USR_EMAIL: values.USR_EMAIL,
      USR_SENHA: values.USR_SENHA,
    }).then((response) =>{
      console.log(response);
    });
  };

  const validationRegister = yup.object().shape({
    USR_EMAIL: yup.string().email("Não é um email").required("Este Campo é obrigatório"),
    USR_SENHA: yup.string().min(8, "A senha deve ter 8 caracteres.").required("Este Campo é obrigatório"),
    confirmPassword: yup.string().oneOf([yup.ref("USR_SENHA"), null], "As senhas não são iguais"),
  });
  //criando oo formulario
  return (
    <div className="container">
      <h1>Cadastro</h1>
      <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
        
        <Form className="login-form">
         
          <div className="login-form-group">
              <Field name="USR_EMAIL" className="form-field" placeholder="Email" />
              <ErrorMessage component="span" name="USR_EMAIL" className="form-error"/>
          </div>

          <div className="login-form-group">
              <Field name="USR_SENHA" className="form-field" placeholder="Senha" />
              <ErrorMessage component="span" name="USR_SENHA" className="form-error"/>
          </div>

          <div className="login-form-group">
              <Field name="confirmPassword" className="form-field" placeholder="Confirme sua Senha" />
              <ErrorMessage component="span" name="confirmPassword" className="form-error"/>
          </div>

          <button className="button" type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
