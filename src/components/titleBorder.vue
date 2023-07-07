<template>
    <div class="titleBorder">
        <!-- 插槽 -->
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .titleBorder{
        position: relative;
        height: 20px;
        line-height: 20px;
        font-size: 17px;
        padding: 20px 0;
        padding-left: 9px;

        &::after{
            content:"";
            position: absolute;
            left: 0;
            width: 2px;
            height: 16px;
            background: #d33a31;
        }
    }
</style>