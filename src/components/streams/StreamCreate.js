import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  return errors;
};

class StreamCreate extends Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit(formValues) {
    console.log('formValues: ', formValues);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="ui form error" onSubmit={handleSubmit(this.onSubmit)}>
        <Field name="title" label="Enter Title" component={this.renderInput} />
        <Field
          name="description"
          label="Enter Description"
          component={this.renderInput}
        />
        <button type="submit" className="ui button primary">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);
