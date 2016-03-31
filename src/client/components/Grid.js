import React from 'react';
import _ from 'underscore';
import {Table, Alert, Pagination, Input, Button, Glyphicon} from 'react-bootstrap';

var Grid = React.createClass({

    propTypes: {
        entity: React.PropTypes.string.isRequired,
        applicationDomain: React.PropTypes.object.isRequired,
        rows: React.PropTypes.array.isRequired,
        page: React.PropTypes.number.isRequired,
        handleSelect: React.PropTypes.func.isRequired,
        handleSearch: React.PropTypes.func.isRequired,
        handleCriteriaChange: React.PropTypes.func.isRequired,
        criteria: React.PropTypes.string
    },

    componentDidMount: function() {
        //React.findDOMNode(this.refs.input).focus();
    },

    renderError: function (message) {
        return <Alert bsStyle="danger">
            <h4>Error</h4>
            <p>{message}</p>
        </Alert>;
    },

    handleSelect(event, selectedEvent) {
        this.props.handleSelect(selectedEvent.eventKey);
    },

    handleCriteriaChange() {
        this.props.handleCriteriaChange(this.refs.input.getValue());
    },

    handleSearch() {
        this.props.handleSearch(this.refs.input.getValue());
    },

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    },

    getElapsedTime: function(elapsedTime) {
        return (elapsedTime /1000).toFixed(2) + ' seconds';
    },

    render: function () {

        let entity = _.find(this.props.applicationDomain.entities, e => {
            return e.name == this.props.entity
        });
        if (!entity)
            return this.renderError(`Could not find entity. Entity name: ${this.props.entity}`);
        let layout;
        if (entity.layouts && entity.layouts.length)
            layout = _.find(entity.layouts, l => l.type == 'search');
        if (!layout)
            layout = entity;

        console.log(layout.fields);

        return (
            <div>
                <div>
                    <div className="search-input-wrapper">
                        <Input
                            autoFocus
                            type="text"
                            value={this.props.criteria}
                            onChange={this.handleCriteriaChange}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Search"
                            ref="input"
                            buttonAfter={<Button className="search-button" onClick={this.handleSearch}><Glyphicon glyph="search" />Search</Button>} />
                    </div>
                </div>
                <p>{this.props.count} results ({this.getElapsedTime(this.props.elapsedTime)})</p>
                <Table bordered condensed>
                    <thead>
                    <tr>
                        {
                            layout.fields.map((f, i) => {
                                return <th key={`th-${i}`}>{f.displayName ? f.displayName : f.name}</th>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.rows.map((r, i) => {
                            return <tr key={`tr-${i}`}>
                                {
                                    layout.fields.map((f, j) => {
                                        return <td key={`td-${i}${j}`}>
                                            {r[f.name]}
                                        </td>
                                    })
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
                <Pagination
                    bsSize="medium"
                    items={this.props.pageCount}
                    activePage={this.props.page}
                    onSelect={this.handleSelect}/>
            </div>
        );
    }
});

export default Grid;