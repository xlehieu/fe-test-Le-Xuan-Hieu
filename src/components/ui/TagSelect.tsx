import { Select, SelectProps, Tag } from "antd";

type Props = {
  useLabelVi?: boolean;
} & SelectProps;

function TagSelect({
  options = [],
  useLabelVi = true,
  ...props
}: Props) {
  return (
    <Select
      {...props}
      options={options.map((option: any) => ({
        value: option.value,
        label: (
          <Tag color={option.color} className="m-0">
            {useLabelVi ? option.labelVi : option.label}
          </Tag>
        ),
      }))}
    />
  );
}

export default TagSelect;