import { Component } from 'react';

export class List extends Component {
    constructor() {
    super();
    this.state = {
        userInput: '',
        list: [],
        today: this.setDate(),
        tasks: 0,
        };
    };

    changed = (event) => {
        this.setState({
            userInput: event,
        });
    };

    addItem = (input) => {
        input.trim();
        if (input.length === 0) {
            alert('Введите текст.');
        } 
        else {
            let records = this.state.list;
            records.push(input);
            this.setState({
                userInput: '',
                list: records,
                tasks: this.state.tasks + 1,
            });
        };
    };

  // функция возвращает падеж (задача, задачи, задач);
    declOfNum(number) {
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['задача', 'задачи', 'задач'];
    return titles[
        number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
    ];
    };

    done = (e) => {
        const li = e.target;
        li.classList.toggle('done');
        if (li.classList.contains('done')) {
            this.setState({
                tasks: this.state.tasks - 1,
            });
        }
        else {
        this.setState({
            tasks: this.state.tasks + 1,
        });
        }
    };

  // устанавливаем дату
    setDate = () => {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        const months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
        ];
        return `${day} ${months[month]} ${year} г.`;
    };


  // очищаем форму
    clear = () => {
        this.setState({
            userInput: '',
            list: [],
            tasks: 0,
        });
    };

    onFormSubmit (e) {
        e.preventDefault();
    }

    render() {
        return (
        <div className="container">
            <div className="header">
                <div className="header-left">
                    <h2>Ваши дела</h2>
                    <p id="date"> {this.state.today} </p>
                </div>
                <div className="header-right">
                    <div>
                        <p id="total"> {this.state.tasks} </p>
                        <p> {this.declOfNum(this.state.tasks)} </p>
                    </div>
                    <button onClick={this.clear} id="btnClear">Очистить</button>
                </div>
            </div>
            <form onSubmit={ this.onFormSubmit}>
                <div className="newRecord">
                    <input
                        onChange={(e) => this.changed(e.target.value)}
                        value={this.state.userInput}
                        id="inputAdd"
                        placeholder="Ваш текст"
                    />
                    <button
                        onClick={() => this.addItem(this.state.userInput)}
                        id="btnAdd"
                    > <img src="https://cdn.glitch.global/f880d5a0-04fb-4c8d-b9d3-967d9b999571/icon_plus.png?v=1661763057394" alt="Добавить запись"/>
                    </button>
                </div>
                <ul className="list">
                    {this.state.list.map((item, index) => (
                        <li onClick={this.done} key={index}>
                            {' '}
                            {item}{' '}
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
    }
};