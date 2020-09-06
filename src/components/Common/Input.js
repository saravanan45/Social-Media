import { withFormsy } from 'formsy-react';
import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue = event => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.onChange(event);
  };

  render() {
    // An error message is passed only if the component is invalid
    const errorMessage = this.props.errorMessage;

    return (
      <div>
        <input
          onChange={this.changeValue}
          placeholder={this.props.placeholder}
          type={this.props.type || 'text'}
          value={this.props.value || ''}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        <span style={{ color: 'red', fontWeight: '600', fontSize: 'large' }}>
          {errorMessage}
        </span>
      </div>
    );
  }
}

export default withFormsy(Input);
