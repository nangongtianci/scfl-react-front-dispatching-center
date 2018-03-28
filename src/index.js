import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import JobReportList from './component/job_report/job_report_list'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<JobReportList />, document.getElementById('root'));
registerServiceWorker();
