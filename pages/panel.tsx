function Panel() {
  return <div>testing</div>;
}

export default Panel;

const sideBarItems = ["Clients", "Campaigns", "Assosiates", "Personal Stats"];

function SideBar() {
  return (
    <div>
      <ul>
        {sideBarItems.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}
