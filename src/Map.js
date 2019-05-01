import React from 'react';

const Base = (props) => {
    return (
        <span data-label={ (props && props.label) || '' } className={ (props && props.classNames) || '' } id={ (props && props.id) } ></span>
    );
};

const Blue = (props) => (Base({ ...props, classNames: 'dot blue' }));
const Red = (props) => (Base({ ...props, classNames: 'dot red' }));
const Green = (props) => (Base({ ...props, classNames: 'dot green' }));
const Int = (props) => (Base({ ...props, classNames: 'dot intersection' }));

const generateLineStations = (size = 6, label = 'Line', componentRef = Green, prefix = 'G') => {
    return (new Array(size)).fill(0).map((el, index) => {
        const props = { id: prefix + index };
        if (!index) {
            props.label = label;
        }
        return componentRef(props);
    });
};

const GS = generateLineStations(7, 'Line A', Green, 'GS');
const BS = generateLineStations(6, 'Line B', Blue, 'BS');
const RS = generateLineStations(6, 'Line C', Red, 'RS');

const config = [
    [ null, null, BS[0], null, null, null, RS[0], null, null, null ],
    [ null, null, BS[1], null, null, null, RS[1], null, null, null ],
    [ null, null,  null, null, null, GS[3], <Int id={'GS4-RS2'} />, GS[5], null, GS[6] ],
    [ GS[0], GS[1], <Int id={'GS2-BS2'} />, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, null, <Int id={'BS3-RS3'} />, null, null, BS[4], BS[5], null ],
    [ null, null, null, null, null, null, null, null, null, null ],
    [ null, null, null, RS[4], null, null, null, null, null, null ],
    [ null, null, null, RS[5], null, null, null, null, null, null ]
];

const blueLine = [
    { top: 45, left: 122, width: 60, transform: `rotate(90deg)` },
    { top: 140, left: 97, width: 110, transform: `rotate(90deg)` },
    { top: 300, left: 110, width: 215, transform: `rotate(56deg)` },
    { top: 387, left: 280, width: 180 },
    { top: 387, left: 465, width: 57  }
].map((el, i) => {
    return { css: { ...el }, class: 'blue', id: 'b' + i }
});

const redLine = [
    { top: 45, left: 370, width: 60, transform: `rotate(90deg)` },
    { top: 110, left: 372, width: 56, transform: `rotate(90deg)` },
    { top: 262, left: 210, width: 260, transform: `rotate(-63deg)` },
    { top: 445, left: 181, width: 133, transform: `rotate(-63deg)` },
    { top: 543, left: 185, width: 57, transform: `rotate(90deg)`  }
].map((el, i) => {
    return { css: { ...el }, class: 'red', id: 'r' + i }
});

const greenLine = [
    { top: 201, left: 30, width: 60 },
    { top: 201, left: 90, width: 60 },
    { top: 170, left: 152, width: 185, transform: `rotate(-18deg)` },
    { top: 140, left: 340, width: 56 },
    { top: 140, left: 404, width: 56 },
    { top: 140, left: 466, width: 116  }
].map((el, i) => {
    return { css: { ...el }, class: 'green', id: 'g' + i }
});

const linesConfig = [
    ...blueLine,
    ...greenLine,
    ...redLine
];

const lines = () => {

    const tmp = linesConfig.map((el, i) => {
        return <hr key={ i } className={'line ' + el.class } style={ el.css } id={ el.id } />
    });
    return (
        tmp
    );
};

const MapComponent = () => {

    const elements = [];
    const _lines = lines();
    for (const [i, el] of config.entries()) {
        const arr = [];
        for (const [index, x] of el.entries()) {
            arr.push(<td key={i + '-' + index} >{ x || '' }</td>);
        }
        elements.push(<tr key={i} >{ arr }</tr>);
    }

    return (
        <div className={'map'} >
            <table>
                <tbody>
                    { elements }
                </tbody>
            </table>
            { _lines }
        </div>
    );
};

export {
    MapComponent
};