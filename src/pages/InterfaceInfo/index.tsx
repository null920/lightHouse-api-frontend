import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceInfoUsingPost,
} from '@/services/lightHouse-api-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Divider,
  Empty,
  Form,
  Image,
  Input,
  List,
  Spin,
  message,
} from 'antd';
import { FormProps } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const params = useParams();
  const [urlRes, setUrl] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const [content, setContent] = useState<any[]>();
  const [isVisible, setIsVisible] = useState(false);
  const [hasPicture, setHasPicture] = useState(false);

  const loadData = async () => {
    if (!params.id) {
      message.error('参数错误');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 调用接口
   * @param values
   */
  const onFinish: FormProps['onFinish'] = async (values) => {
    if (!params.id) {
      message.error('参数错误');
      return;
    }
    // 调用接口
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPost({
        id: Number(params.id),
        ...values,
      });
      setUrl(null);
      try {
        const responseObject = JSON.parse(res.data);
        if (responseObject.title !== undefined && responseObject.title.includes('60')) {
          console.log(responseObject.data);
          setContent(responseObject.data);
          setIsVisible(true);
        } else if (
          responseObject &&
          responseObject.url !== null &&
          responseObject.url !== undefined &&
          responseObject.url !== ''
        ) {
          setHasPicture(true);
          setUrl(responseObject.url);
          setImageLoad(true);
          console.log(responseObject.url);
        } else {
          setInvokeRes(res.data);
        }
      } catch (error) {}
      message.success('请求成功');
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setInvokeLoading(false);
    //console.log('Success:', values);
  };
  // 图片加载完成时触发的回调函数
  const handleImageLoad = () => {
    setImageLoad(false); // 图片加载完成后，设置loading为false，不再显示加载指示器
  };
  return (
    <PageContainer title="接口信息">
      <Card>
        {data ? (
          <Descriptions title={data.name} bordered column={1}>
            <Descriptions.Item label="接口状态">
              {data.status === 1 ? (
                <Badge status="processing" text="正常" />
              ) : (
                <Badge status="error" text="关闭" />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="接口描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form
          name="invoke"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea allowClear autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button disabled={data?.status === 0} type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="调用结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
      {isVisible && (
        <Card>
          <List
            size="large"
            header={<div>在这里每天60秒读懂世界</div>}
            bordered
            dataSource={content}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
      )}
      {hasPicture && (
        <Card>
          <Spin spinning={imageLoad}>
            <Image
              width={600}
              src={urlRes}
              onLoad={handleImageLoad} // 监听图片加载完成事件
            />
          </Spin>
          {imageLoad && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <h1>图片加载中请耐心等待</h1>
            </div>
          )}
        </Card>
      )}
    </PageContainer>
  );
};

export default Index;
