import {Button, Form, Input,} from "antd";

type HeaderProps = {
    onSearch: (title: string) => void;
}

export function Header({onSearch}: HeaderProps) {
    const onFinish = (values: { title: string }) => {
        onSearch(values.title);
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="todo"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{width: "100%"}}
            initialValues={{
                title: '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="inline"
        >
            <Form.Item
                name="title"
                style={{width: "50%"}}
            >
                <Input placeholder="Enter title"/>
            </Form.Item>

            <Form.Item style={{width: "20%"}}>
                <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                    Search
                </Button>
            </Form.Item>

            <Form.Item style={{width: "20%"}}>
                <Button type="link" href="/todos/create" style={{width: "100%"}}>
                    Create Todo
                </Button>
            </Form.Item>
        </Form>

    )
}

