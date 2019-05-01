import React, { Component } from "react";
import { PassengersInput } from './PassengersInput';

export class RenderLogic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.state,
            isPlaying: false,
            MOVE: { red: 0, green: 0, blue: 0 },
            intersections: [ 'GS2-BS2', 'GS4-RS2', 'BS3-RS3' ],
            trainsState: 'BS0 GS0 RS0',
            blue: { passengers: 42, stations: 5, key: 'BS', color: 'blue', suffix: 'b' },
            green: { passengers: 21, stations: 6, key: 'GS', color: 'green', suffix: 'g' },
            red: { passengers: 50, stations: 5, key: 'RS', color: 'red', suffix: 'r' }
        };

        this.priority = ([ this.state.blue, this.state.green, this.state.red ].sort(
            (a, b) => { return a.passengers < b.passengers ? 1 : b.passengers === a.passengers ? 0 : -1; }
        ));

        this.setPassengers = this.setPassengers.bind(this);

    }

    loopFn = () => {
        let classList = [];
        this.priority.forEach(({ stations, key, color, suffix }) => {
        let nextStation;
        let index;
        let move = this.state.MOVE[color];

        if (Math.floor(move / stations) % 2 === 1) {
            // going back
            nextStation = stations - (move % stations);
            classList.push('back-' + suffix);
        } else {
            // moving forward
            nextStation = (move % stations);
            classList.push('forward-' + suffix);
        }
        if ((index = this.state.intersections.findIndex((el => el.toString().includes(key + nextStation)))) > -1) {
            // if next station exists within intersection stations
            let otherStationID = this.state.intersections[index].split('-').filter((el) => (el !== (key + nextStation)));
            if (classList.findIndex((el) => (el === otherStationID[0])) > -1) {
                // skip this move
                classList.push(this.state.trainsState.split(' ').find((el) => (el.includes(key))))
            } else {
                // move to next station
                classList.push(key + nextStation);
                move++;
            }
        } else {
            // move to next station
            classList.push(key + nextStation);
            move++;
        }
        this.setState({
            ...this.state,
            MOVE: { ...this.state.MOVE, [color]: move }
        });
        });
        // MOVE++;
        const trainsState = classList.join(' ');
        // console.log(trainsState);
        this.setState({
            ...this.state,
            trainsState

        });
    };

    setPassengers = (color, event) => {
        color = ['red', 'blue', 'green'].find((el) => ((el === color)));
        const value = parseInt(event.target.value);

        // some validation
        if (!color || isNaN(value) || value < 0) {
            return;
        }

        console.log('fired change!');

        this.setState({
            ...this.state,
            [color]: { ...this.state[color], passengers: value }
        });
    };

    setPassengersRed = (event) => (this.setPassengers('red', event));
    setPassengersGreen = (event) => (this.setPassengers('green', event));
    setPassengersBlue = (event) => (this.setPassengers('blue', event));



    intervalRef;

    handleBtnClick = () => {
        (!this.state.isPlaying) ? this.start() : this.stop();
    };
    
    start = () => {
        if (!this.state.isPlaying) {
            this.intervalRef = window.setInterval(this.loopFn, 2000);
            this.setState({
                ...this.state,
                isPlaying: true
            });
        }
    };

    stop = () => {
        window.clearInterval(this.intervalRef);
        this.setState({
            ...this.state,
            MOVE: { red: 0, green: 0, blue: 0 },
            isPlaying: false,
            trainsState: 'BS0 GS0 RS0'
        });
    };

    componentDidUpdate(prevProps) {
        if (this.state.trainsState !== prevProps.trainsState) {
            return true;
        }
    }

    render() {
        return (
            <>
                <div className={ this.state.trainsState } >{ this.props.children }</div>
                <button onClick={ this.handleBtnClick }>{ this.state.isPlaying ? 'stop' : 'start' }</button>
                {!this.state.isPlaying && <form id="editor">
                <label className="mono" >Passengers: </label>
                    <PassengersInput handler={ this.setPassengersBlue } value={ this.state.blue.passengers } placeholder="blue" />
                    <PassengersInput handler={ this.setPassengersGreen } value={ this.state.green.passengers } placeholder="green" />
                    <PassengersInput handler={ this.setPassengersRed } value={ this.state.red.passengers } placeholder="red" />
                </form>}
            </>
        )
    }

}