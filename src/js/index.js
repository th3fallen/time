import TimePicker from './timepicker';

window.onload = () => {
    const picker = new TimePicker();

    picker.bindInput('#bind-one');
    picker.bindInput('#bind-two', {timeFormat: 'military'});
};
