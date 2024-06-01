import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'null920';
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={defaultMessage}
      links={[
        {
          key: '数字灯塔-API开放平台',
          title: '数字灯塔-API开放平台',
          href: '#',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/null920',
          blankTarget: true,
        },
        {
          key: 'null920',
          title: 'null920',
          href: 'https://github.com/null920',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
