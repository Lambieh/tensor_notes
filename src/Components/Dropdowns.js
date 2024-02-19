export default function Dropdown(props) {
  const { items, onSelectedSortChange, classNameButton } = props;

  return (
    <select
      onChange={(event) => onSelectedSortChange(event.target.value)}
      className={classNameButton}
    >
      {items.map((item) => {
        return (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        );
      })}
    </select>
  );
}
