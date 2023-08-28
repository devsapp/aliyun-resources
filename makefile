RES?=aliyun_base

build:
	@./help.sh build ${RES}

publish:
	@./help.sh publish ${RES}

test:
	@./help.sh test ${RES}

build-all:
	@./help.sh build

publish-all:
	@./help.sh publish

test-all:
	@./help.sh test

format-all:
	@./help.sh format

build-transformer:
	cd ros_transformer && npm run build && cd -

test-transformer: 
	cd ros_transformer/examples && s3 deploy && cd - 

publish-transformer: build-transformer
	cd ros_transformer && npm run build && s3 registry publish && cd -

statistics:
	@wget -q https://images.devsapp.cn/tools/git-statistics.sh && bash git-statistics.sh && rm git-statistics.sh


test-oss:
	@cd ./aliyun_oss_bucket/examples && s3 deploy && cd - 

test-ots:
	@cd ./aliyun_ots_instance/examples && s3 deploy && cd - 
	@cd ./aliyun_ots_table/examples && s3 deploy && cd - 

test-sls:
	@cd ./aliyun_sls_project/examples && s3 deploy && cd - 
	@cd ./aliyun_sls_logstore/examples && s3 deploy && cd - 

test-sg:
	@cd ./aliyun_security_group/examples && s3 deploy && cd - 
	@cd ./aliyun_security_group_ingress/examples && s3 deploy && cd - 
	@cd ./aliyun_security_group_egress/examples && s3 deploy && cd -


ut-test: build-all
	@./help.sh ut-test