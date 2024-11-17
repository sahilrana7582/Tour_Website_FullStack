import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: 'Name',
  },
  {
    type: 'divider',
  },
  {
    label: 'Rating',
  },
  {
    type: 'divider',
  },
  {
    label: 'Price',
  },
  {
    type: 'divider',
  },
  {
    label: 'Distance',
  },
];
const Filter = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
    className="cursor-pointer"
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Filter By
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default Filter;
