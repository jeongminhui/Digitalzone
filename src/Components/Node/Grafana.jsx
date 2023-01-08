import React from 'react';
import "./Grafana.scss"

const Grafana = () => {
    return (
        <div className="Grafana">
            <iframe title="sent" src="http://localhost:3000/d-solo/N3JaljtVk/new-dashboard?orgId=1&from=1672720612721&to=1672721029958&panelId=8" width="525" height="313" frameborder="0"></iframe>
            <iframe title="cpu" src="http://localhost:3000/d-solo/N3JaljtVk/new-dashboard?orgId=1&from=1672705830946&to=1672727430946&theme=light&panelId=4" width="525" height="313" frameborder="0"></iframe>
            <iframe title="rs" src="http://localhost:3000/d-solo/N3JaljtVk/new-dashboard?orgId=1&from=1672705581376&to=1672727181376&theme=light&panelId=10" width="525" height="313" frameborder="0"></iframe>
            <iframe title="rec" src="http://localhost:3000/d-solo/N3JaljtVk/new-dashboard?orgId=1&from=1672705664942&to=1672727264942&theme=light&panelId=2" width="525" height="313" frameborder="0"></iframe>
        </div>
    );
};

export default Grafana;