import React, { Component } from 'react';
import { Progress, Nav, Row, Col } from 'rsuite';

import { getThemeNameByID, getActivityNameByID, getSectorNameByID } from './../../service/util/names';
import { getColorByScore } from './../../service/util/score';

class index extends Component {
    state = {
        activeDetailKey: 'ideas'
    }

    handleSelectDetailTab = (activeDetailKey) => {
        this.setState({ activeDetailKey });
    }

    render() {
        const { overallScore, scoreBreakdown, riskMetrics } = this.props;

        return (
            <div className="score-breakdown">
                <div className="overall">
                    <Row>
                        <Col
                            xs={20}
                            xsOffset={2}
                            md={6}
                            mdOffset={0}
                            className="score-breakdown-general">
                            <Progress.Circle
                                className="mr-10"
                                percent={parseInt(overallScore * 10)}
                                strokeColor={getColorByScore(overallScore)} />
                        </Col>
                        <Col
                            xs={20}
                            xsOffset={2}
                            md={18}
                            mdOffset={0}
                            className="score-breakdown-general">
                            <h4>Overall Score</h4>
                            <p>The overall score is composed of several scores, and it takes into account
                                client's preferences towards ideas and causes to support, activities and sectors
                                to avoid as well as risk preference.</p>
                            <p>The score is on the scale from 0 to 100. 100 hundred being the maximum score
                                a portfolio can achieve, and this means that it fully conforms to all client's
                                preferences.</p>
                        </Col>
                    </Row>
                </div>

                <div className="detail">
                    <Nav
                        appearance="tabs"
                        activeKey={this.state.activeDetailKey}
                        onSelect={this.handleSelectDetailTab}>
                        <Nav.Item eventKey="ideas">Ideas and Causes</Nav.Item>
                        <Nav.Item eventKey="activities">Activities to Avoid</Nav.Item>
                        <Nav.Item eventKey="sectors">Restricted Sectors</Nav.Item>
                        <Nav.Item eventKey="risk">Risk</Nav.Item>
                    </Nav>

                    {/* Ideas */}
                    {(this.state.activeDetailKey === 'ideas') && <div>
                        <Row>
                            <Col
                                xs={20}
                                xsOffset={2}
                                md={10}
                                mdOffset={0}
                                className="score-breakdown-general">
                                <Progress.Circle
                                    className="mr-10"
                                    percent={parseInt(scoreBreakdown.idea_involvement_score * 10)}
                                    strokeColor={getColorByScore(scoreBreakdown.idea_involvement_score)} />
                                <h5>Idea and Causes Involvement Score</h5>
                                <p>This score is calculated based on the ideas and causes the client wants to
                                    support.</p>
                            </Col>
                            <Col
                                xs={20}
                                xsOffset={2}
                                md={14}
                                mdOffset={0}
                                className="score-breakdown-detail">
                                <h6>Detailed breakdown</h6>
                                {(!scoreBreakdown.relevant_idea_involvements) && <p className="no-more-info">
                                    No more information available at the moment.
                                </p>}

                                {(scoreBreakdown.relevant_idea_involvements) && scoreBreakdown.relevant_idea_involvements.map((i, k) => (
                                    <div key={k} className="score-breakdown-detail__item">
                                        <p>{getThemeNameByID(i.idea)}</p>
                                        <Progress.Line
                                            percent={parseInt(i.involvement)}
                                            strokeColor={getColorByScore(i.involvement)} />
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </div>}

                    {/* Activities */}
                    {(this.state.activeDetailKey === 'activities') && <div>
                        <Row>
                            <Col
                                xs={20}
                                xsOffset={2}
                                md={10}
                                mdOffset={0}
                                className="score-breakdown-general">
                                <Progress.Circle
                                    className="mr-10"
                                    percent={parseInt(scoreBreakdown.activity_involvement_score * 10)}
                                    strokeColor={getColorByScore(scoreBreakdown.activity_involvement_score)} />
                                <h5>Activity Involvement Score</h5>
                                <p>This score is calculated based on the activities the client wants to avoid.</p>
                            </Col>
                            <Col
                                xs={20}
                                xsOffset={2}
                                md={14}
                                mdOffset={0}
                                className="score-breakdown-detail">
                                <h6>Detailed breakdown</h6>
                                {(!scoreBreakdown.restricted_activity_involvements) && <p className="no-more-info">
                                    No more information available at the moment.
                                </p>}

                                {(scoreBreakdown.restricted_activity_involvements) && scoreBreakdown.restricted_activity_involvements.map((i, k) => (
                                    <div key={k} className="score-breakdown-detail__item">
                                        <p>{getActivityNameByID(i.negative_activity)}</p>
                                        {parseInt(i.involvement)<=0 && <p className="no-more-info">No involvement</p>}
                                        {parseInt(i.involvement)>0 && parseInt(i.involvement)<1 && <p style={{color:"orange"}} className="no-more-info">Few companies reported significant involvement in this activity</p>}
                                        {parseInt(i.involvement)>=1 && <p style={{color:"red"}} className="no-more-info">There are companies that reported significant involvement in this activity</p>}
                                        {/* {parseInt(i.involvement)>=0.5 && <Progress.Line
                                            percent={parseInt(i.involvement)}
                                            strokeColor={getColorByScore(i.involvement)} />} */}
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </div>}

                    {/* Sectors */}
                    {(this.state.activeDetailKey === 'sectors') && <div>
                        <Row>
                            <Col
                                xs={20}
                                xsOffset={2}
                                md={10}
                                mdOffset={0}
                                className="score-breakdown-general">
                                <Progress.Circle
                                    className="mr-10"
                                    percent={parseInt(scoreBreakdown.sector_involvement_score * 10)}
                                    strokeColor={getColorByScore(scoreBreakdown.sector_involvement_score)} />
                                <h5>Sector Involvement Score</h5>
                                <p>This score is calculated based on the client???s ???restricted sectors???
                                    preference. Restricted sectors that have more than 5% share in the ETF
                                    negatively impact the score.</p>
                            </Col>
                            <Col
                                xs={20}
                                xsOffset={2}
                                md={14}
                                mdOffset={0}
                                className="score-breakdown-detail">
                                <h6>Detailed breakdown</h6>
                                {(!scoreBreakdown.restricted_sector_involvements) && <p className="no-more-info">
                                    No more information available at the moment.
                                </p>}

                                {(scoreBreakdown.restricted_sector_involvements) && scoreBreakdown.restricted_sector_involvements.map((i, k) => (
                                    <div key={k} className="score-breakdown-detail__item">
                                        <p>{getSectorNameByID(i.sector)}</p>
                                        <Progress.Line
                                            percent={parseInt(i.involvement)}
                                            strokeColor={getColorByScore(i.involvement)} />
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </div>}

                    {/* Risk */}
                    {(this.state.activeDetailKey === 'risk') && <div>
                        <Row>
                            <Col
                                xs={20}
                                xsOffset={2}
                                md={10}
                                mdOffset={0}
                                className="score-breakdown-general">
                                <Progress.Circle
                                    className="mr-10"
                                    percent={parseInt(scoreBreakdown.risk_score * 10)}
                                    strokeColor={getColorByScore(scoreBreakdown.risk_score)} />
                                <h5>Risk Score</h5>
                                <p>is calculated based on the client???s risk preference. We take into account
                                    client???s risk, beta, Sharpe and Sortino ratios for the
                                    since the inception of ETF.</p>
                            </Col>

                            <Col
                                xs={20}
                                xsOffset={2}
                                md={14}
                                mdOffset={0}
                                className="score-breakdown-detail">
                                <h6>Detailed breakdown</h6>
                                {(!riskMetrics) && <p className="no-more-info">
                                    No more information available at the moment.
                                </p>}

                                {(riskMetrics) && <div>
                                    <div className="score-breakdown-detail__item">
                                        <p>Sharpe Ratio:&nbsp;
                                            <strong>{riskMetrics.sharpe_ratio.toFixed(3)}</strong>
                                        </p>
                                    </div>
                                    <div className="score-breakdown-detail__item mt-10">
                                        <p>Sortino Ratio:&nbsp;
                                            <strong>{riskMetrics.sortino_ratio.toFixed(3)}</strong>
                                        </p>
                                    </div>
                                    <div className="score-breakdown-detail__item mt-10">
                                        <p>Beta:&nbsp;
                                            <strong>{riskMetrics.beta.toFixed(3)}</strong>
                                        </p>
                                    </div>
                                </div>}
                            </Col>
                        </Row>
                    </div>}

                </div>
            </div>
        );
    }
}

export default index;