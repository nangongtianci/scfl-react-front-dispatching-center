import React, { Component } from 'react';
import './job_report.css'

// 设定服务器请求路径
const baseUrl = 'http://localhost:8080/';
const jobReportPath = 'job/record/page'; // 作业报告分页查询
const jarReportTitle = (
    <ul className="job_report_ul title">
        <li>包点类</li>
        <li>方法名称</li>
        <li>执行状态</li>
        <li>执行结果</li>
        <li>操作</li>
    </ul>
)

const noData = (
    <div className="noData">暂无数据!</div>
);

// 列表条目
function JobReportItem(props){
    return (
        <ul className="job_report_ul">
            <li>{props.data.fullClassName}</li>
            <li>{props.data.methodName}</li>
            <li>{props.data.executeStatus}</li>
            <li>{props.data.exceptionDesc}</li>
            <li><a href="">删除</a></li>
        </ul>
    )
}

export default class JobReportList extends Component{
    constructor(props){
        super(props);
        this.state={
            jobReportList:null
        }
    }


    componentDidMount(){
        // 组件加载完成从服务器获取数据
        fetch(baseUrl+jobReportPath).then((resp)=>{
            if(resp.status!==200) {
                throw new Error('fail to get response with status:'+resp.status);
            }
            resp.json().then((respJson)=>{
                this.setState({
                    jobReportList:respJson.data.records
                });
            }).catch((err)=>{
                this.setState({
                    jobReportList:null
                });
            })
        }).catch((err)=>{
            this.setState({
                jobReportList:null
            });
        })
    }

    joinItem(){
        let items = [];
        const ulData = this.state.jobReportList;
        if(ulData != null && ulData.length > 0){
            items = ulData.map((item) =>
                <JobReportItem data={item} key={item.id}/>
            );
        }
        return items;
    }

    render(){
        let items = this.joinItem();
        const showData = (items !=null && items.length > 0)?items:noData;

        return (
            <div>
                {jarReportTitle}
                {showData}
            </div>
        );
    }
}