<view class="login-page">
    <view class="panel login-form">
        <view class="input-row row1">
            <input data-type="pass" bindinput="checkForm" type="password" maxlength="30" placeholder="请输入新的密码" />
        </view>
        <view class="flex-box input-row row2">
            <input class="flex-item input" data-type="code" bindinput="bindInput" type="number" maxlength="30" placeholder="请输入验证码" />
            <view  data-disabled="{{isDisabled}}" class="sendcode" bindtap='sendCode'>
                <block wx:if="{{!codeButtonOn}}">
                    获取验证码
                </block>
                <block wx:if="{{codeButtonOn}}">
                    {{codeTime}}S后再发送
                </block>
            </view>
        </view>
    </view>
    <button type="button" class="btn login_btn" bindtap="change">保存</button>
</view>